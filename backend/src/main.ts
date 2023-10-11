import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // これでCORSが有効になる
  app.useGlobalPipes(new ValidationPipe()); // これでリクエストのバリデーションが有効になる
  await app.listen(3000);
}
bootstrap();
