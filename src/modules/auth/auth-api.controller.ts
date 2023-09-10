import { Body, Controller, Inject, Post, SetMetadata } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {
  RegisterResponseDto,
  RegisterBodyDto,
  LoginBodyDto,
  LoginResponseDto,
} from './dto';

@Controller('api/auth')
@ApiTags('Login & Register')
export class AuthApiController {
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
    return await this.authService.registerAction(payload);
  }

  @Post('login')
  @SetMetadata('isPublic', true)
  @ApiOperation({ summary: 'ورود' })
  @ApiResponse({
    type: LoginResponseDto,
  })
  async login(@Body() payload: LoginBodyDto): Promise<LoginResponseDto> {
    return await this.authService.loginAction(payload);
  }
}
