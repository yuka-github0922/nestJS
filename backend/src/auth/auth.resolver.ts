import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { SignInResponse } from './dto/signInResponse';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { SignInInput } from './dto/signIn.Input';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => SignInResponse) // localStrategyのバリデートメソッドが呼ばれるようにする
  @UseGuards(GqlAuthGuard) // 呼び出しに成功した場合のみ以下が実行される
  async signIn(
    @Args('signInInput') signInInput: SignInInput,
    @Context() context: any,
  ) {
    return await this.authService.signIn(context.user); // validate関数で返却されたuserが入っている
  }
}
