import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import 'dotenv/config';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    console.log(ctx.getContext().req);
    return ctx.getContext().req;
  }
}
