import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'updates' }) // keeps the existing Mongo collection
export class Achievement extends Document {
  /** "College" or a department: CSE, Mechanical, Civil, Architectural, Applied Science, Electrical. */
  /** No longer used: events carry the category now. Kept so older records stay valid. */
  @Prop()
  category?: string;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  image: string;

  /** Optional page-builder layout for the detail page (see achievements/blocks.util.ts). */
  @Prop({ type: [Object], default: [] })
  blocks: Record<string, any>[];

  // @Prop({ required: true })
  // publicId: string;
}

export const AchievementsSchema = SchemaFactory.createForClass(Achievement);
