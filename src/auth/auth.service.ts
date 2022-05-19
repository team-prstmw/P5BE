import { BadRequestException, Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { User } from "src/user/schemas/user.schema";
import { LoginUserDto } from "./dto/login-user.dto";
import { RegisterUserDto } from "./dto/register-user.dto";
const bcrypt = require("bcrypt");

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(
    username: string,
    pass: string
  ): Promise<Partial<User> | null> {
    const user = await this.usersService.findByUsername(username);

    if (user && (await bcrypt.compare(pass, user.password))) {
      const { username, role, _id } = user;

      return { username, role, id: _id };
    }
    return null;
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.validateUser(
      loginUserDto.username,
      loginUserDto.password
    );

    if (!user) {
      return null;
    }

    const payload = { username: user.username, role: user.role };

    return {
      access_token: this.jwtService.sign(payload, {
        subject: `${user.id}`,
      }),
    };
  }

  async register(registerUserDto: RegisterUserDto) {
    const { username, password, confirmPassword } = registerUserDto;
    if (password !== confirmPassword) {
      throw new BadRequestException("Passwords do not match");
    }

    const existingUser = await this.usersService.findByUsername(username);

    if (existingUser) {
      throw new BadRequestException("User with this username already exists");
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await this.usersService.create({
      ...registerUserDto,
      password: hashedPassword,
    });
    const payload = { username: user.username, sub: user._id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
