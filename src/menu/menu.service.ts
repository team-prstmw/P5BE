import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { MealType } from '../shared/enums/meal-type.enum';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu, MenuDocument } from './schemas/menu.schema';

@Injectable()
export class MenuService {
  constructor(@InjectModel(Menu.name) private menuModel: Model<MenuDocument>) {}

  async create(createMenuDto: CreateMenuDto) {
    const menu = new this.menuModel(createMenuDto);
    return menu.save();
  }

  async findAll() {
    return this.menuModel.find().exec();
  }

  async findOne(options: FilterQuery<MenuDocument>) {
    return this.menuModel.findOne(options).exec();
  }

  async findByName(name: string) {
    return this.menuModel.findOne({ name });
  }

  async findById(id: string) {
    return this.menuModel.findOne({ _id: id });
  }

  async findByType(mealType: MealType) {
    return this.menuModel.findOne({ mealType });
  }

  async update(id: string, updateMenuDto: UpdateMenuDto) {
    const { name, type, price, description } = updateMenuDto;
    return this.menuModel.findOneAndUpdate({ _id: id }, { name, type, price, description }, { new: true });
  }

  async remove(id: string) {
    return this.menuModel.deleteOne({ _id: id });
  }
}
