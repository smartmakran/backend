import { Body, Controller, Inject, Post, SetMetadata } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {
  RegisterResponseDto,
  RegisterBodyDto,
  LoginBodyDto,
  LoginResponseDto,
} from './dto';

@Controller('auth')
@ApiTags('ثبت‌نام و ورود')
export class AuthController {
  @Inject() private readonly authService: AuthService;

  @Post('register')
  @SetMetadata('isPublic', true)
  @ApiOperation({ summary: 'ثبت‌نام' })
  @ApiResponse({
    type: RegisterResponseDto,
  })
  async register(
    @Body() payload: RegisterBodyDto,
  ): Promise<RegisterResponseDto> {
    return await this.authService.register(payload);
  }

  @Post('login')
  @SetMetadata('isPublic', true)
  @ApiOperation({ summary: 'ورود' })
  @ApiResponse({
    type: LoginResponseDto,
  })
  async login(@Body() payload: LoginBodyDto): Promise<LoginResponseDto> {
    return await this.authService.login(payload);
  }
}
