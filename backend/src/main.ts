import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { Connection } from 'mongoose';
import { getConnectionToken } from '@nestjs/mongoose';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { getUploadRoot } from './storage/storage.constants';

const DEV_ORIGIN = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get(ConfigService);
  const logger = new Logger('Bootstrap');
  const production = config.get('NODE_ENV') === 'production';
  const port = config.get<number>('PORT', 3000);

  // Behind a reverse proxy (nginx, Render, ...) the real client IP is needed
  // for rate limiting: set TRUST_PROXY=1.
  if (config.get('TRUST_PROXY')) {
    app.set(
      'trust proxy',
      Number(config.get('TRUST_PROXY')) || config.get('TRUST_PROXY'),
    );
  }

  // Security headers. Uploaded images are shown on the (cross-origin) website,
  // so they must stay embeddable.
  app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));

  // Only the website and the admin panel may call the API from a browser.
  // Development: any localhost port. Production: CORS_ORIGINS is required.
  const allowed = String(config.get('CORS_ORIGINS', ''))
    .split(',')
    .map((origin) => origin.trim().replace(/\/$/, ''))
    .filter(Boolean);
  app.enableCors({
    origin: (origin, callback) => {
      const ok =
        !origin ||
        allowed.includes(origin) ||
        (!production && DEV_ORIGIN.test(origin));
      callback(null, ok);
    },
    methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    maxAge: 86400,
  });

  app.useStaticAssets(getUploadRoot(), {
    prefix: '/uploads',
    index: false,
    dotfiles: 'ignore',
  });

  app.enableShutdownHooks();
  await app.listen(port);

  const connection = app.get<Connection>(getConnectionToken());
  if (connection.readyState === 1) {
    logger.log('MongoDB connected');
  } else {
    logger.warn('MongoDB not connected yet');
  }
  logger.log(
    `Application is running on port ${port} (${production ? 'production' : 'development'})`,
  );
}
bootstrap();
