import * as bcryptjs from 'bcryptjs';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SigninInput } from './input/signin.input';
import { SignupInput } from './input/signup.input';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/interface/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signin(signinInput: SigninInput) {
    const { username, password } = signinInput;
    const user = await this.usersService.findOne({ username });
    if (!user) {
      throw Error('UserName or password incorrect');
    }

    const valid = await bcryptjs.compare(password, user.password);
    if (!valid) {
      throw Error('UserName or password incorrect');
    }

    const jwt = this.jwtService.sign({ id: user.id });
    return { accessToken: jwt };
  }

  async signup(signupInput: SignupInput) {
    const usernameExists = await this.usersService.findOne({
      username: signupInput.username,
    });

    if (usernameExists) {
      throw Error('UserName is already in use');
    }

    const password = await bcryptjs.hash(signupInput.password, 10);

    const user = await this.usersService.create({
      ...signupInput,
      password,
    });

    const jwt = this.jwtService.sign({ id: user.id });

    return { accessToken: jwt };
  }

  async validate({ id }): Promise<User> {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
