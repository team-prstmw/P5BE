import { IsString, IsNumber } from 'class-validator';
import { MealType } from 'src/shared/enums/meal-type.enum';
export class CreateMenuDto {
  @IsString()
  name: string;

  type: MealType;

  @IsNumber()
  price: number;

  @IsString()
  description: string;
}
