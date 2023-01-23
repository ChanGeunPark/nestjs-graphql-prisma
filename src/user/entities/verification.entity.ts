import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';

@ObjectType()
export class Verification extends CoreEntity {
  @Field(() => String)
  code: string;

  @Field(() => Number)
  userId: number;
}
