import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class SuccessStory extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  image: string;

  /** Optional page-builder layout for the detail page (see utils/blocks.util.ts). */
  @Prop({ type: [Object], default: [] })
  blocks: Record<string, any>[];
}

export const SuccessStorySchema = SchemaFactory.createForClass(SuccessStory);
