import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import mongoose, { Document } from "mongoose";
import { MealType } from "../../shared/enums/meal-type.enum";

export type MenuDocument = Document & Menu;

@Schema()
export class Menu {
  @ApiProperty()
  @Prop({ required: true })
  name: string;

  @ApiProperty()
  @Prop({ enum: MealType, required: true })
  type: MealType;

  @ApiProperty()
  @Prop({ required: true })
  price: number;

  @ApiProperty()
  @Prop({ required: false })
  description: string;
}

export const MenuSchema = SchemaFactory.createForClass(Menu);
