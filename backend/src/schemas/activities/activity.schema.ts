import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Activity extends Document {
  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  department: string;

  @Prop({ required: true })
  imageUrl: string;
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
