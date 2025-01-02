import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Order Management System API')
    .setDescription(
      'This API allows regular users to create and manage orders. Each order is associated with a unique chat room facilitating communication between users and administrators.'
    )
    .setVersion('1.0')
    .addTag('Orders')
    .addTag('Users')
    .addTag('Chats')
    .build();

  const document = SwaggerModule.createDocument(app, config);

 
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}/api`);
  console.log(`Swagger docs available at: http://localhost:${port}/api/docs`);
}
bootstrap();
