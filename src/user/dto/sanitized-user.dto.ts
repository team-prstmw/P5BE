import { ApiProperty } from "@nestjs/swagger";
import { Role } from "src/shared/enums/user-role.enum";

export class SanitizedUserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  username: string;

  @ApiProperty({ description: "User role", example: Role.ADMIN, enum: Role })
  role: Role;
}
