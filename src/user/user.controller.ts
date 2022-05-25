import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiResponse } from "@nestjs/swagger";
import { DeleteResult } from "mongodb";

import { UserService } from "./user.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { RolesGuard } from "src/auth/roles.guard";
import { Role } from "src/shared/enums/user-role.enum";
import { AllowRoles } from "src/auth/roles.decorator";
import { sanitizeUser, sanitizeUsers } from "src/utils/sanitize";
import { SanitizedUserDto } from "./dto/sanitized-user.dto";

@ApiBearerAuth()
@Controller("users")
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: "Get all users",
    type: SanitizedUserDto,
    isArray: true,
  })
  async findAll(): Promise<SanitizedUserDto[]> {
    return sanitizeUsers(await this.userService.findAll());
  }

  @Get(":id")
  @ApiResponse({
    status: 200,
    description: "Get user by id",
    type: SanitizedUserDto,
  })
  async findOne(@Param("id") id: string): Promise<SanitizedUserDto> {
    return sanitizeUser(await this.userService.findById(id));
  }

  @AllowRoles(Role.ADMIN)
  @Patch(":id")
  @ApiResponse({
    status: 200,
    description: "Update user by id",
    type: SanitizedUserDto,
  })
  async update(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<SanitizedUserDto> {
    return sanitizeUser(await this.userService.update(id, updateUserDto));
  }

  @AllowRoles(Role.ADMIN)
  @Delete(":id")
  @ApiResponse({
    status: 200,
    description: "Delete user by id",
  })
  async remove(@Param("id") id: string): Promise<DeleteResult> {
    return this.userService.remove(id);
  }
}
