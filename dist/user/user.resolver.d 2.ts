import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserOutput, CreateUserInput } from './dto/create-user.input';
import { LoginInput, LoginOutput } from './dto/login.dto';
import { UserProfileInput, UserProfileOutput } from './dto/user-profile.dto';
import { EditProfileInput, EditProfileOutput } from './dto/edit-profile.dto';
export declare class UserResolver {
    private readonly userService;
    constructor(userService: UserService);
    createUser(createUserInput: CreateUserInput): Promise<CreateUserOutput>;
    login(loginInput: LoginInput): Promise<LoginOutput>;
    findAll(): import(".prisma/client").PrismaPromise<import(".prisma/client").User[]>;
    findOne(id: number): string;
    me(authUser: User): User;
    userProfile(userProfileInput: UserProfileInput): Promise<UserProfileOutput>;
    editProfile(authUser: User, editProfileInput: EditProfileInput): Promise<EditProfileOutput>;
    removeUser(id: number): string;
}
