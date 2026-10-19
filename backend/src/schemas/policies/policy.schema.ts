import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * One card of the "College Guidelines & Policies" page: a title, bullet
 * points, and optionally sub-sections (a sub-heading with its own points).
 */
@Schema({ timestamps: true })
export class Policy extends Document {
  @Prop({ required: true, trim: true })
  title: string;

  /** Position on the page (lowest first). */
  @Prop({ default: 0 })
  order: number;

  /** Optional sub-heading shown above `points`. */
  @Prop({ default: '' })
  pointsHeading: string;

  @Prop({ type: [String], default: [] })
  points: string[];

  @Prop({ type: [Object], default: [] })
  groups: { subheading: string; points: string[] }[];
}

export const PolicySchema = SchemaFactory.createForClass(Policy);
