import { MealType } from 'src/shared/enums/meal-type.enum';

export class CreateMenuDto {
  name: string;
  mealType: MealType;
  price: number;
  description: string;
}
