import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { Role } from "src/shared/enums/user-role.enum";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User, UserDocument, UserSchema } from "./schemas/user.schema";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    const user = new this.userModel(createUserDto);

    return user.save();
  }

  async findAll() {
    return this.userModel.find().exec();
  }

  private async findOne(options: FilterQuery<UserDocument>) {
    return this.userModel.findOne(options).exec();
  }

  async findByRole(role: Role) {
    return this.findOne({ role });
  }

  async findByUsername(username: string) {
    return this.findOne({ username });
  }

  async findById(id: string) {
    return this.findOne({ _id: id });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { username, password, role } = updateUserDto;

    return this.userModel.findOneAndUpdate(
      { _id: id },
      { username, password, role },
      { new: true }
    );
  }

  async remove(id: string) {
    return this.userModel.deleteOne({ _id: id });
  }
}
