import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class ErrorResponse {
  @Field()
  path: string;
  @Field()
  message: string;
}
