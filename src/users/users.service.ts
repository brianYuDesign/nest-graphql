import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcryptjs from 'bcryptjs';

import { User } from './interface/user.interface';
import { SigninInput } from '../auth/input/signin.input';
import { SignupInput } from '../auth/input/signup.input';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async findOne(filter) {
    return this.userModel.findOne(filter);
  }

  async findById(id: string) {
    return this.userModel.findById(id);
  }

  async create(input: Partial<User>) {
    return this.userModel.create(input);
  }
}
