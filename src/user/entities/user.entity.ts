import { ObjectType, Field, Int } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';

type UserRole = 'client' | 'owner' | 'delivery';

@ObjectType()
export class User extends CoreEntity {
  // extends CoreEntity(통일된 값들)를 상속받는다.
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  role: UserRole;
}
