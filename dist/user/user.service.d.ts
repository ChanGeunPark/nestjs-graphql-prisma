import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { LoginInput } from './dto/login.dto';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
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
}
