import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { Connection } from 'mongoose';
import { getConnectionToken } from '@nestjs/mongoose';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const logger = new Logger('Bootstrap');
  const port = process.env.PORT || 3000;
  const connection = app.get<Connection>(getConnectionToken());

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('API Docs')
    .setDescription('API documentation for managing routes')
    .setVersion('1.0')
    .addTag('Routes')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads',
  });

  await app.listen(port);

  if (connection.readyState === 1) {
    logger.log('📦 MongoDB connected successfully !!');
  } else {
    logger.warn('⚠️ MongoDB not connected yet !!');
  }

  logger.log(`🚀 Application is running on: http://localhost:${port}`);
}
bootstrap();
