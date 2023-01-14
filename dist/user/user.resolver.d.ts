import { UserService } from './user.service';
import { CreateUserOutput, CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { LoginInput, LoginOutput } from './dto/login.dto';
export declare class UserResolver {
    private readonly userService;
    constructor(userService: UserService);
    createUser(createUserInput: CreateUserInput): Promise<CreateUserOutput>;
    login(loginInput: LoginInput): Promise<LoginOutput>;
    findAll(): import(".prisma/client").PrismaPromise<import(".prisma/client").User[]>;
    findOne(id: number): string;
    updateUser(updateUserInput: UpdateUserInput): string;
    removeUser(id: number): string;
}
