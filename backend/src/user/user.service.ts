import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserInput } from './dto/createUser.input';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  // DIを行っている
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const { name, email, password } = createUserInput;
    const hashedPassword = await bcrypt.hashSync(password, 10); //ハッシュ化

    return await this.prismaService.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  }

  async getUser(email: string): Promise<User> {
    // 1件のみ取得する場合はfindUniqueを使用する（schema.prismaでUnique属性つけたから使える）
    return await this.prismaService.user.findUnique({
      where: { email },
    });
  }
}
