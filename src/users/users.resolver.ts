import { Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';

@Resolver('Users')
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}
}
