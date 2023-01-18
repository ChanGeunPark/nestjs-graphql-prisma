import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { LoginInput } from './dto/login.dto';
import { JwtService } from 'src/jwt/jwt.service';
import { User } from 'src/interfaces/users';
export declare class UserService {
    private prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
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
    findOne(id: number): string;
    update(id: number, updateUserInput: UpdateUserInput): string;
    remove(id: number): string;
    findById(id: number): Promise<User>;
}
