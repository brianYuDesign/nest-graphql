import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SigninInput {
  @Field()
  username: string;
  @Field()
  password: string;
}
