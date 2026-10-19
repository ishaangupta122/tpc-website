import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/** The departments that have a page on the website (fixed list). */
export const DEPARTMENT_KEYS = [
  'cse',
  'mechanical',
  'civil',
  'electrical',
  'architectural',
  'appliedScience',
] as const;
export type DepartmentKey = (typeof DEPARTMENT_KEYS)[number];

/** What a department page lists under "Other Pages": an HTML page, a PDF, or a link. */
export type DepartmentResource = {
  title: string;
  slug: string;
  type: 'page' | 'pdf' | 'link';
  html: string;
  /** Relative path of an uploaded PDF (type "pdf"). */
  file: string;
  /** Web address (type "link"). */
  url: string;
};

/**
 * What the admin saved for one department. The description and head of
 * department are not stored here: the description is part of the website and
 * the head of department comes from the Faculty list.
 */
@Schema({ timestamps: true })
export class Department extends Document {
  @Prop({ required: true, unique: true, enum: DEPARTMENT_KEYS })
  key: string;

  @Prop({ type: [Object], default: [] })
  pages: DepartmentResource[];
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);
