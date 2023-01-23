import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

//dio
import { CreateUserInput } from './dto/create-user.input';
import { LoginInput } from './dto/login.dto';
import { EditProfileInput } from './dto/edit-profile.dto';
import { JwtService } from 'src/jwt/jwt.service';

// ilb
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { UserProfileOutput } from './dto/user-profile.dto';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    // private readonly config: ConfigService,// global config 어디서나 가져올 수 있다.
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async create({
    email,
    password,
    role,
  }: CreateUserInput): Promise<{ ok: boolean; error?: string }> {
    try {
      const exists = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (exists) {
        return { ok: false, error: 'There is a user with that email already' };
      }

      // 비밀번호를 암호화한다.
      const hashPassword = await bcrypt.hash(password, 10);

      const user = await this.prisma.user.create({
        data: {
          email,
          password: hashPassword,
          role,
        },
      });

      const verification = await this.prisma.verification.create({
        data: {
          code: uuidv4().replace(/-/g, ''),
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });

      this.mailService.sendVerificationEmail(user.email, verification.code);

      return { ok: true };
    } catch (e) {
      return { ok: false, error: "Couldn't create account" };
    }
  }

  async login({
    email,
    password,
  }: LoginInput): Promise<{ ok: boolean; error?: string; token?: string }> {
    // 1. find the user with the email
    // 2. check if the password is correct
    // 3. make a JWT and give it to the user
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (!user) {
        return {
          ok: false,
          error: 'User not found',
        };
      }

      // 입력받은 비밀번호와 암호화된 비밀번호를 비교한다.
      const passwordCurrent = await bcrypt.compare(password, user.password);
      if (!passwordCurrent) {
        return {
          ok: false,
          error: 'Wrong password',
        };
      }

      // JWT(json web token) 를 생성한다.
      const token = this.jwtService.sign(user.id);

      return {
        ok: true,
        token,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findById(id: number): Promise<UserProfileOutput> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id,
        },
      });

      if (user) {
        return {
          ok: true,
          user,
        };
      }
    } catch (error) {
      return { ok: false, error: 'User not found' };
    }
  }

  async editProfile(userId: number, editProfileInput: EditProfileInput) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      // 이메일이 변경되었을 경우에만 인증코드를 생성한다.
      if (user && user.email !== editProfileInput.email) {
        const hashPassword = await bcrypt.hash(editProfileInput.password, 10);
        const verification = await this.prisma.verification.create({
          data: {
            code: uuidv4().replace(/-/g, ''),
            user: {
              connect: {
                id: user.id,
              },
            },
          },
        });
        this.mailService.sendVerificationEmail(user.email, verification.code);

        // 이메일과 비밀번호를 변경한다.
        await this.prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            email: editProfileInput.email,
            password: editProfileInput.password ? hashPassword : user.password,
          },
        });
      } else {
        throw Error();
      }
      return { ok: true };
    } catch (e) {
      return {
        ok: false,
        error: "Couldn't update profile",
      };
    }
  }

  // 이메일 인증
  async verifyEmail(code: string): Promise<{ ok: boolean; error?: string }> {
    const verification = await this.prisma.verification.findFirst({
      where: {
        code,
      },
      include: {
        user: true,
      },
    });
    try {
      if (verification) {
        await this.prisma.user.update({
          where: {
            id: verification.user.id,
          },
          data: {
            verified: true,
          },
        });

        // 인증하면 코드 지우기
        await this.prisma.verification.delete({
          where: {
            id: verification.id,
          },
        });

        return {
          ok: true,
        };
      }
      return { ok: false, error: 'Verification not found' };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}
