import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Credentials {
  @Field()
  accessToken: string;
}
