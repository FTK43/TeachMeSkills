import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema({ collection: 'users' })
export class User {
  @Prop({ unique: true, required: true })
  id: number;

  @Prop({ unique: true, required: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
