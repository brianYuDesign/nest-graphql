import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    console.log('role guard');
    const user = ctx.getContext().req.user;
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log('roleguard.user', user);
    console.log('roleguard.roles', roles);

    return true;
  }
}
