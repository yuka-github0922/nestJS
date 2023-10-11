import { Args, Resolver, Mutation, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/createUser.input';
import { User } from '.prisma/client';
import { User as UserModel } from './models/user.model';
import { GetUserArgs } from './dto/getUser.Args';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserModel)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return await this.userService.createUser(createUserInput);
  }

  @Query(() => UserModel, { nullable: true })
  @UseGuards(JwtAuthGuard) // tokenが含まれている場合のみ実行される
  async getUser(@Args() getUserArgs: GetUserArgs): Promise<User> {
    return await this.userService.getUser(getUserArgs.email);
  }
}
