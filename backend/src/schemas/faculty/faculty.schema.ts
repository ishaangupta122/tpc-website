import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Faculty extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ default: 'N/A' })
  phone: string;

  @Prop({ required: true })
  department: string;

  @Prop({ required: true })
  designation: string;

  @Prop({ required: true })
  joinedDate: string;

  @Prop({ type: [String], required: false })
  education: string[];

  @Prop({ required: false })
  image: string;

  /** Table rows shown on the profile (keys: see faculty/faculty-sections.util.ts). */
  @Prop({ type: [Object], default: [] })
  publications: Record<string, string>[];

  @Prop({ type: [Object], default: [] })
  conferences: Record<string, string>[];

  @Prop({ type: [Object], default: [] })
  books: Record<string, string>[];

  // @Prop({ required: true })
  // publicId: string;
}

export const FacultySchema = SchemaFactory.createForClass(Faculty);
