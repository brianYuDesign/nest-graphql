import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SignupInput {
  @Field()
  username: string;
  @Field()
  password: string;
  @Field()
  role: string;
}
