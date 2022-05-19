import { IsEnum, IsString } from "class-validator";
import { Role } from "src/shared/enums/user-role.enum";

export class RegisterUserDto {
  @IsString()
  username: string;

  @IsEnum(Role)
  role: Role;

  @IsString()
  password: string;

  @IsString()
  confirmPassword: string;
}
