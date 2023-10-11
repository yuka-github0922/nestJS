import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

// 'local'はLocalStrategy用にしたい, という意味
export class GqlAuthGuard extends AuthGuard('local') {
  constructor() {
    super();
  }

  // context = 実行コンテキスト
  // Override graphQL用のgetRequest
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext();
    request.body = ctx.getArgs().signInInput; // 次のリゾルバーでargsに指定する名前とする
    return request;
  }
}
