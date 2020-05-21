import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SigninInput } from './input/signin.input';
import { SignupInput } from './input/signup.input';
import { Credentials } from './type/credentials';
import { CurrentUser } from 'src/shared/user.decorator';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './gql-auth.guard';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Credentials)
  async signin(@Args('signinInput') signinInput: SigninInput) {
    return this.authService.signin(signinInput);
  }

  @Mutation(() => Credentials)
  async signup(@Args('signupInput') signupInput: SignupInput) {
    return this.authService.signup(signupInput);
  }

  @Query(() => Credentials)
  @UseGuards(GqlAuthGuard)
  hi(@CurrentUser() user) {
    console.log(user);
    return { accessToken: 'hi' };
  }
}
