import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AicteCourse } from '../schemas/aicte-courses/aicte-course.schema';
import {
  CreateAicteCourseDto,
  UpdateAicteCourseDto,
} from '../schemas/aicte-courses/aicte-course.dto';

@Injectable()
export class AicteCoursesService {
  constructor(
    @InjectModel(AicteCourse.name) private readonly model: Model<AicteCourse>,
  ) {}

  /** Newest first. */
  findAll() {
    return this.model.find().sort({ _id: -1 }).lean().exec();
  }

  create(dto: CreateAicteCourseDto) {
    return this.model.create(dto);
  }

  async update(id: string, dto: UpdateAicteCourseDto) {
    const updated = await this.model
      .findByIdAndUpdate(id, dto, { new: true })
      .lean()
      .exec();
    if (!updated) throw new NotFoundException('Course not found');
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.model.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Course not found');
    return { message: 'Course deleted' };
  }
}
