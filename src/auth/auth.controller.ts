import {
  Controller,
  Request,
  Post,
  BadRequestException,
  Body,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterUserDto } from "./dto/register-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  async login(@Request() req, @Body() loginUserDto: LoginUserDto) {
    const token = await this.authService.login(loginUserDto);

    if (!token) {
      throw new BadRequestException("Invalid credentials");
    }

    return token;
  }

  @Post("register")
  async register(@Request() req, @Body() registerUserDto: RegisterUserDto) {
    const token = await this.authService.register(registerUserDto);

    if (!token) {
      throw new BadRequestException("Invalid credentials");
    }

    return token;
  }
}
