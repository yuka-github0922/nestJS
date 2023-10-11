import { Field, HideField, Int, ObjectType } from '@nestjs/graphql';

// graphQLのモデルと認識させるため
@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  // クライアントからは取得できないように
  @HideField()
  password: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
