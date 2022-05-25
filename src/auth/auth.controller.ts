import {
  Controller,
  Request,
  Post,
  BadRequestException,
  Body,
  HttpCode,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterUserDto } from "./dto/register-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { ApiResponse } from "@nestjs/swagger";
import { LoginResponseDto } from "./dto/login-response.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: "Login user",
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: "Invalid credentials",
  })
  async login(@Body() loginUserDto: LoginUserDto): Promise<LoginResponseDto> {
    const token = await this.authService.login(loginUserDto);

    if (!token) {
      throw new BadRequestException("Invalid credentials");
    }

    return token;
  }

  @Post("register")
  @ApiResponse({
    status: 201,
    description: "Register user",
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: 400,
  })
  async register(
    @Body() registerUserDto: RegisterUserDto
  ): Promise<LoginResponseDto> {
    const token = await this.authService.register(registerUserDto);

    if (!token) {
      throw new BadRequestException();
    }

    return token;
  }
}
