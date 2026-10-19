import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Event extends Document {
  /** "College" or a department (CSE, Mechanical, Civil, Architectural, Applied Science, Electrical). */
  @Prop({ default: 'College' })
  category: string;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  image?: string;

  /** Optional page-builder layout for the detail page (see utils/blocks.util.ts). */
  @Prop({ type: [Object], default: [] })
  blocks: Record<string, any>[];
}

export const EventSchema = SchemaFactory.createForClass(Event);
