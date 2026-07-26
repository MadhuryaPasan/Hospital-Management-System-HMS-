import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // this will remove alterd aditional api request parameters auto
      forbidNonWhitelisted: true, //for these extra fields api return 400 bad request error
      transform: true, //automaticaly convert a value if it initially asked as a number
    }),
  );
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
