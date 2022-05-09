import { Role } from "src/shared/enums/user-role.enum";

export class CreateUserDto {
    username: string;
    password: string;
    role: Role;
}
