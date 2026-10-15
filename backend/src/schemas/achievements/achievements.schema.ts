import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'updates' }) // keeps the existing Mongo collection
export class Achievement extends Document {
  /** "College" or a department: CSE, Mechanical, Civil, Architectural, Applied Science, Electrical. */
  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  image: string;

  // @Prop({ required: true })
  // publicId: string;
}

export const AchievementsSchema = SchemaFactory.createForClass(Achievement);
