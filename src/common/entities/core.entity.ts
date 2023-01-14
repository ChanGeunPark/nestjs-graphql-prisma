import { Field } from '@nestjs/graphql';

export class CoreEntity {
  @Field(() => Number)
  id: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
