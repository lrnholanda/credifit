import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const config = new DocumentBuilder()
    .setTitle('Credifit')
    .setDescription('The Credifit API description')
    .setVersion('0.1')
    .build();

    const document = SwaggerModule.createDocument(app, config); 
    SwaggerModule.setup('api', app, document);
    
    await app.listen(3001);
}
bootstrap();
