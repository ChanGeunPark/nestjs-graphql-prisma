import { Field, Int } from '@nestjs/graphql';

export class CoreEntity {
  @Field(() => Int)
  id: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
