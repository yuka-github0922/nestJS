import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'; //Queryはこっちからimportすること
import { TaskService } from './task.service';
import { Task as TaskModel } from './models/task.model';
import { CreateTaskInput } from './dto/createTask.input';
import { Task } from '@prisma/client';
import { UpdateTaskInput } from './dto/updateTask.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver()
export class TaskResolver {
  // serviceを使用したいのでDIを行う
  // 依存先のクラスに@injectable()があり、moduleのprovidersに登録されている必要がある
  constructor(private readonly taskService: TaskService) {}
  // constructorに依存先のクラスを引数として渡すことでnestJSが自動的にtaskServiceのインスタンスを生成してくれ、constructorに渡してくれる
  // resolverの中でserviceを使用することができる

  // graphQLのデータを取得するメソッドを表すために
  // () => [Task]はgraphQLの書式で
  // 第二引数は設定のためのobject
  @Query(() => [TaskModel], { nullable: 'items' })
  @UseGuards(JwtAuthGuard) // tokenが含まれている場合のみ実行される
  async getTasks(
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<Task[]> {
    // serviceのgetTasksメソッドの結果をそのまま返す
    return await this.taskService.getTasks(userId);
  }

  @Mutation(() => TaskModel)
  @UseGuards(JwtAuthGuard) // tokenが含まれている場合のみ実行される
  async createTask(
    @Args('createTaskInput') createTaskInput: CreateTaskInput,
  ): Promise<Task> {
    return await this.taskService.createTask(createTaskInput);
  }

  @Mutation(() => TaskModel)
  @UseGuards(JwtAuthGuard) // tokenが含まれている場合のみ実行される
  async updateTask(
    @Args('updateTaskInput') updateTaskInput: UpdateTaskInput,
  ): Promise<Task> {
    return await this.taskService.updateTask(updateTaskInput);
  }

  @Mutation(() => TaskModel)
  async deleteTask(@Args('id', { type: () => Int }) id: number): Promise<Task> {
    return await this.taskService.deleteTask(id);
  }
}
