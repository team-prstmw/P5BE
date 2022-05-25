import { IsEnum, IsOptional, IsString } from "class-validator";
import { Role } from "src/shared/enums/user-role.enum";

export class TokenPayloadDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsString()
  username: string;

  @IsEnum(Role)
  role: Role;
}
