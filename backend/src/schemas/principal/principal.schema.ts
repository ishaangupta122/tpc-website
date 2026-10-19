import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/** The single "Message from the Principal" page (one document). */
@Schema({ timestamps: true })
export class Principal extends Document {
  @Prop({ trim: true })
  name: string;

  /** Relative path of the photo, e.g. `/uploads/images/principal/<uuid>.jpg`. */
  @Prop()
  image: string;

  /** The message; a blank line starts a new paragraph. */
  @Prop()
  message: string;

  /** Key highlight cards: a title and a list of bullet points. */
  @Prop({ type: [Object], default: [] })
  highlights: { title: string; points: string[] }[];
}

export const PrincipalSchema = SchemaFactory.createForClass(Principal);
