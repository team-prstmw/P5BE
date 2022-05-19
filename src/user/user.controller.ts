import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { RolesGuard } from "src/auth/roles.guard";
import { Role } from "src/shared/enums/user-role.enum";
import { AllowRoles } from "src/auth/roles.decorator";
import { sanitizeUser, sanitizeUsers } from "src/utils/sanitize";

@Controller("users")
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    return sanitizeUsers(await this.userService.findAll());
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return sanitizeUser(await this.userService.findById(id));
  }

  @AllowRoles(Role.ADMIN)
  @Patch(":id")
  async update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @AllowRoles(Role.ADMIN)
  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.userService.remove(id);
  }
}
