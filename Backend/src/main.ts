import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging/logging.interceptor';
import { TransformInterceptor } from './common/interceptors/transform/transform.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Hospital Management API')
    .setDescription('API documentation for the Hospital Management System')
    .setVersion('1.0')
    .addBearerAuth() // add bearer authentication
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new TransformInterceptor(),
  );
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
