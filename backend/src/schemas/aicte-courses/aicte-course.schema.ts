import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/** One row of the "AICTE approved courses and intake" table. */
@Schema({ timestamps: true })
export class AicteCourse extends Document {
  @Prop({ required: true, trim: true })
  department: string;

  @Prop({ required: true, min: 0 })
  approvedIntake: number;
}

export const AicteCourseSchema = SchemaFactory.createForClass(AicteCourse);
