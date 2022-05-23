import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  async create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  @Get()
  async findAll() {
    return this.menuService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.menuService.findById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(id, updateMenuDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.menuService.remove(id);
  }
}
