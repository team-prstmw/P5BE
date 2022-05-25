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
import { ApiBearerAuth, ApiResponse } from "@nestjs/swagger";
import { DeleteResult } from "mongodb";

import { MenuService } from "./menu.service";
import { CreateMenuDto } from "./dto/create-menu.dto";
import { UpdateMenuDto } from "./dto/update-menu.dto";
import { Menu } from "./schemas/menu.schema";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { RolesGuard } from "src/auth/roles.guard";
import { AllowRoles } from "src/auth/roles.decorator";
import { Role } from "src/shared/enums/user-role.enum";

@ApiBearerAuth()
@Controller("menu")
@UseGuards(JwtAuthGuard, RolesGuard)
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @AllowRoles(Role.ADMIN)
  @Post()
  @ApiResponse({
    status: 201,
    description: "Create menu",
    type: Menu,
  })
  async create(@Body() createMenuDto: CreateMenuDto): Promise<Menu> {
    return this.menuService.create(createMenuDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: "Get all menus",
    type: Menu,
    isArray: true,
  })
  async findAll(): Promise<Menu[]> {
    return this.menuService.findAll();
  }

  @Get(":id")
  @ApiResponse({
    status: 200,
    description: "Get menu by id",
    type: Menu,
  })
  async findOne(@Param("id") id: string): Promise<Menu> {
    return this.menuService.findById(id);
  }

  @Patch(":id")
  @ApiResponse({
    status: 200,
    description: "Update menu by id",
    type: Menu,
  })
  async update(
    @Param("id") id: string,
    @Body() updateMenuDto: UpdateMenuDto
  ): Promise<Menu> {
    return this.menuService.update(id, updateMenuDto);
  }

  @Delete(":id")
  @ApiResponse({
    status: 200,
    description: "Delete menu by id",
  })
  async remove(@Param("id") id: string): Promise<DeleteResult> {
    return this.menuService.remove(id);
  }
}
