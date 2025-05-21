import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

export type UserDocument = User & Document;

@Schema({collection: 'users'})
export class User {
    @Prop({unique: true, required: true})
    id: string;

    @Prop({unique: true, required: true})
    username: string;

    @Prop({unique: true, required: true})
    email: string;

    @Prop()
    age: number;

    @Prop({default: true})
    isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
