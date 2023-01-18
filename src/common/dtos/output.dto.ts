import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MutationOutput {
  // Mutation의 return type을 정의한다.

  @Field(() => String, { nullable: true })
  error?: string;

  @Field(() => Boolean)
  ok: boolean;
}
