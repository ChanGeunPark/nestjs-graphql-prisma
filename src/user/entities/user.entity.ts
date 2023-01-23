import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';

export enum UserRole {
  Client = 'Client',
  Owner = 'Owner',
  Delivery = 'Delivery',
}

registerEnumType(UserRole, { name: 'UserRole' });

@ObjectType()
export class User extends CoreEntity {
  // extends CoreEntity(통일된 값들)를 상속받는다.
  @Field((type) => String)
  email: string;

  @Field((type) => String)
  password: string;

  @Field((type) => Boolean)
  verified?: boolean;

  @Field((type) => UserRole)
  role: 'Client' | 'Owner' | 'Delivery';
}
