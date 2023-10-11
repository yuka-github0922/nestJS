import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/models/user.model';

@ObjectType() // 決まった形がない時はこれをつける
export class SignInResponse {
  @Field()
  accessToken: string;

  @Field(() => User) // このままではgraphQLがUserを認識できないので、型を指定する
  user: User; // 認証に成功したUserを返す。prismaではなく、models/user.model.tsのUserを使う
}
