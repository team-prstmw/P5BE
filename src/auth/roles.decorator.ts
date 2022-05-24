import { SetMetadata } from "@nestjs/common";
import { Role } from "src/shared/enums/user-role.enum";

export const ROLES_KEY = "roles";
export const AllowRoles = (roles: Role[] | Role) =>
  SetMetadata(ROLES_KEY, roles);
