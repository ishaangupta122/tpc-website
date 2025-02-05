import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
// import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { FacultyModule } from './faculty/faculty.module';
import { Placements } from './schemas/placements/placements.schema';
import { UpdatesModule } from './updates/updates.module';
import { PlacementsModule } from './placements/placements.module';
import { JwtModule } from '@nestjs/jwt';
import { CommitteeModule } from './committee/committee.module';
import { ActivityModule } from './activities/activity.module';
import { GalleryModule } from './gallery/gallery.module';
import { SuccessStoryModule } from './successstory/successstory.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    JwtModule.register({
      secret: process.env.JWT_SECRET || '',
      signOptions: { expiresIn: '1h' },
    }),
    PlacementsModule,
    UpdatesModule,
    // AuthModule,
    UsersModule,
    EventsModule,
    FacultyModule,
    CommitteeModule,
    ActivityModule,
    GalleryModule,
    SuccessStoryModule,
  ],
})
export class AppModule {}
