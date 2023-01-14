import { Injectable } from '@nestjs/common';
import { User } from 'src/interfaces/users';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import * as bcrypt from 'bcrypt';
import { LoginInput } from './dto/login.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

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

      const hashPassword = await bcrypt.hash(password, 10);

      await this.prisma.user.create({
        data: {
          email,
          password: hashPassword,
          role,
        },
      });
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

      const passwordCurrent = await bcrypt.compare(password, user.password); // 암호화된 비밀번호와 입력받은 비밀번호를 비교한다.
      if (!passwordCurrent) {
        return {
          ok: false,
          error: 'Wrong password',
        };
      }

      return {
        ok: true,
        token: 'asdfasdf',
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

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
