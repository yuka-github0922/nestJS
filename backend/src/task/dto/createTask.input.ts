import { Field, InputType, Int } from '@nestjs/graphql';
import { IsDateString, IsNotEmpty } from 'class-validator';

// classをmutationの引数に指定するには必要
@InputType()
export class CreateTaskInput {
  @Field() // Objectには必要
  @IsNotEmpty() // validationには必要
  name: string;

  @Field()
  @IsDateString() // validationには必要
  dueDate: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Int)
  userId: number;
}
