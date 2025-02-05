import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, model } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({required: true, unique:false})
  password:string;

  @Prop({ required: true })
  firebaseUid: string;

  @Prop({required: false})
  phonenumber:string;

  @Prop({ default: false }) 
  verified: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
export const UserModel = model<User>('users', UserSchema);
