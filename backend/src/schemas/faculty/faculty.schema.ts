import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Faculty extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  department: string;

  @Prop({ required: true })
  designation: string;

  @Prop({ required: true })
  joinedDate: string;

  @Prop({ type: [String], required: false })
  education: string[];

  @Prop({ required: true })
  experience: string;

  @Prop({ required: false })
  image: string;

  // @Prop({ required: true })
  // publicId: string;
}

export const FacultySchema = SchemaFactory.createForClass(Faculty);
