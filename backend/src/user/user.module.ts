import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [UserService, UserResolver],
  exports: [UserService], // 認証を行う際にユーザー情報を取得するために必要
})
export class UserModule {}
