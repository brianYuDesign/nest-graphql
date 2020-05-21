import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class ItemInput {
  @Field()
  title: string;
  @Field(() => Int)
  price: number;
  @Field()
  description: string;
}
