import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { LoginInput } from './dto/login.dto';
import { EditProfileInput } from './dto/edit-profile.dto';
import { JwtService } from 'src/jwt/jwt.service';
import { UserProfileOutput } from './dto/user-profile.dto';
import { MailService } from 'src/mail/mail.service';
export declare class UserService {
    private prisma;
    private readonly jwtService;
    private readonly mailService;
    constructor(prisma: PrismaService, jwtService: JwtService, mailService: MailService);
    create({ email, password, role, }: CreateUserInput): Promise<{
        ok: boolean;
        error?: string;
    }>;
    login({ email, password, }: LoginInput): Promise<{
        ok: boolean;
        error?: string;
        token?: string;
    }>;
    findAll(): import(".prisma/client").PrismaPromise<import(".prisma/client").User[]>;
    remove(id: number): string;
    findById(id: number): Promise<UserProfileOutput>;
    editProfile(userId: number, editProfileInput: EditProfileInput): Promise<{
        ok: boolean;
        error?: undefined;
    } | {
        ok: boolean;
        error: string;
    }>;
    verifyEmail(code: string): Promise<{
        ok: boolean;
        error?: string;
    }>;
}
