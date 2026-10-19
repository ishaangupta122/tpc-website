import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AicteCoursesController } from './aicte-courses.controller';
import { AicteCoursesService } from './aicte-courses.service';
import {
  AicteCourse,
  AicteCourseSchema,
} from '../schemas/aicte-courses/aicte-course.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AicteCourse.name, schema: AicteCourseSchema },
    ]),
  ],
  controllers: [AicteCoursesController],
  providers: [AicteCoursesService],
})
export class AicteCoursesModule {}
