import { ObjectType, Field, Int, ID, Directive } from '@nestjs/graphql';

@ObjectType()
@Directive('@auth(roles:["admin", "client"])')
export class ItemType {
  @Field(() => ID)
  readonly id?: string;
  @Directive('@auth(roles:["admin"])')
  @Field()
  readonly title: string;
  @Field(() => Int)
  readonly price: number;
  @Field()
  readonly description: string;
}
