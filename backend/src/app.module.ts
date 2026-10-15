import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsModule } from './events/events.module';
import { FacultyModule } from './faculty/faculty.module';
import { AchievementsModule } from './achievements/achievements.module';
import { PlacementsModule } from './placements/placements.module';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';
import { validateEnv } from './config/env.validation';
import { HealthController } from './health.controller';
import { CommitteeModule } from './committee/committee.module';
import { GalleryModule } from './gallery/gallery.module';
import { SuccessStoryModule } from './successstory/successstory.module';
import { NoticesModule } from './notices/notices.module';
import { DocumentsModule } from './documents/documents.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate: validateEnv }),
    // Loose global limit; the login route has its own strict one.
    ThrottlerModule.forRoot([{ ttl: 60_000, limit: 300 }]),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.getOrThrow<string>('MONGO_URI'),
      }),
    }),
    AuthModule,
    PlacementsModule,
    AchievementsModule,
    EventsModule,
    FacultyModule,
    CommitteeModule,
    GalleryModule,
    SuccessStoryModule,
    NoticesModule,
    DocumentsModule,
  ],
  controllers: [HealthController],
  providers: [
    // Order matters: rate-limit first, then check the token.
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
})
export class AppModule {}
