import {
  Field,
  InputType,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { User } from '../entities/user.entity';
import { CreateUserInput } from './create-user.input';

@ObjectType()
export class EditProfileOutput extends CoreOutput {}

@InputType()
export class EditProfileInput extends PartialType(CreateUserInput) {
  // PartialType은 PickType으로 선택된 필드들을 모두 optional로 만들어준다.
  // PickType은 User에서 email, password만 선택한다.
}
