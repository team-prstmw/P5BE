import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { MealType } from '../../shared/enums/meal-type.enum';

export type MenuDocument = Document & Menu;

@Schema()
export class Menu {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ enum: MealType, required: true })
  mealType: MealType;

  @Prop({ required: true })
  price: number;

  @Prop({ required: false })
  description: string;
}

export const MenuSchema = SchemaFactory.createForClass(Menu);
