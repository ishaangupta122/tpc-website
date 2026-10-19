import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/** The college contact details shown in the footer, top bar and Contact page (one document). */
@Schema({ timestamps: true })
export class Contact extends Document {
  @Prop({ trim: true })
  name: string;

  /** One line per row. */
  @Prop()
  address: string;

  /** Phone numbers as written, e.g. "75088-55997"; the first is shown in the top bar. */
  @Prop({ type: [String], default: [] })
  phones: string[];

  @Prop({ trim: true })
  email: string;

  @Prop({ trim: true })
  hours: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
