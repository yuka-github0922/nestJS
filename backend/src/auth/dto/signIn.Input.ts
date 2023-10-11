import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, MinLength } from 'class-validator';

@InputType() // Mutationの引数となるように
export class SignInInput {
  @Field()
  @IsEmail()
  email: string;
  @Field()
  @MinLength(8)
  password: string;
}
