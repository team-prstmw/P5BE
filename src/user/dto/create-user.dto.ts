import { ApiProperty } from "@nestjs/swagger";
import { Role } from "src/shared/enums/user-role.enum";

export class CreateUserDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty({ description: "User role", example: Role.ADMIN, enum: Role })
  role: Role;
}
