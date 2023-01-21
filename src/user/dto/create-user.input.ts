import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

import { User } from '../entities/user.entity';

@InputType()
export class CreateUserInput extends PickType(
  User,
  ['email', 'password', 'role'] as const,
  InputType,
) {}

@ObjectType()
export class CreateUserOutput extends CoreOutput {}
