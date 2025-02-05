import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Gallery extends Document {
  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  imageUrl: string;
}

export const GallerySchema = SchemaFactory.createForClass(Gallery);
