import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsEnum } from "class-validator";
import { MealType } from "src/shared/enums/meal-type.enum";
export class CreateMenuDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({
    description: "Meal type",
    example: MealType.ENTRY,
    enum: MealType,
  })
  @IsEnum(MealType)
  type: MealType;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsString()
  description: string;
}
