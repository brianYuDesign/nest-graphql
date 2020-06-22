import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SigninInput } from './input/signin.input';
import { SignupInput } from './input/signup.input';
import { Credentials } from './type/credentials';
import { CurrentUser } from 'src/shared/user.decorator';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './gql-auth.guard';
import { UserType } from '../users/type/user.type';
import { RolesGuard } from '../shared/roles.guard';
import { Roles } from 'src/shared/roles.decorator';

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

  @Query(() => UserType)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('admin', 'client')
  me(@CurrentUser() user) {
    return user;
  }
}
