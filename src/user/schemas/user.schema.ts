import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Role } from "src/shared/enums/user-role.enum";

export type UserDocument = Document & User;

@Schema()
export class User extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ enum: Role, required: true })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
