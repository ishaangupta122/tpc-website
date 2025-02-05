import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Update extends Document {
  @Prop({ required: true })
  tag: string;

  // @Prop({ required: false })
  // tagColor: string;

  @Prop({ required: true })
  time: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  image: string;

  // @Prop({ required: true })
  // publicId: string; 
}

export const UpdatesSchema = SchemaFactory.createForClass(Update);
