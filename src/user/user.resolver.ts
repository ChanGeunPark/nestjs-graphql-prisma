import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserOutput, CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { LoginInput, LoginOutput } from './dto/login.dto';

@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation((returns) => CreateUserOutput) // Mutation의 return type을 직접 정의한다.
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<CreateUserOutput> {
    try {
      return await this.userService.create(createUserInput);
    } catch (e) {
      return {
        error: e,
        ok: false,
      };
    }
  }

  @Mutation((returns) => LoginOutput)
  async login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
    try {
      return await this.userService.login(loginInput);
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }
}
