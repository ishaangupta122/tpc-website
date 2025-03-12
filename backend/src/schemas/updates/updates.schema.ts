import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Update extends Document {
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

export const UpdatesSchema = SchemaFactory.createForClass(Update);
