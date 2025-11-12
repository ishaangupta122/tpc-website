import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { Logger } from '@nestjs/common';
import { Connection } from 'mongoose';
import { getConnectionToken } from '@nestjs/mongoose';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const logger = new Logger('Bootstrap');
  const port = process.env.PORT || 3000;
  const connection = app.get<Connection>(getConnectionToken());

  app.enableCors();

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
