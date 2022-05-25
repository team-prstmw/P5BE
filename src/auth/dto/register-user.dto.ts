import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString } from "class-validator";
import { Role } from "src/shared/enums/user-role.enum";

export class RegisterUserDto {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty({ description: "User role", example: Role.ADMIN, enum: Role })
  @IsEnum(Role)
  role: Role;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  confirmPassword: string;
}
