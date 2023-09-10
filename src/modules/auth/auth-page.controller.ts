import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Render,
  SetMetadata,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {
  RegisterResponseDto,
  RegisterBodyDto,
  LoginBodyDto,
  LoginResponseDto,
} from './dto';

@Controller('auth')
@ApiTags('Login & Register Pages')
@SetMetadata('isPublic', true)
export class AuthPageController {
  @Inject() private readonly authService: AuthService;

  @Get('login')
  @Render('auth/login')
  async loginPage(): Promise<any> {
    return await this.authService.loginPage();
  }

  @Post('login')
  async loginAction(@Body() payload: LoginBodyDto): Promise<LoginResponseDto> {
    return await this.authService.loginAction(payload);
  }

  @Get('register')
  async registerPage(
    @Body() payload: RegisterBodyDto,
  ): Promise<RegisterResponseDto> {
    return await this.authService.registerPage(payload);
  }

  @Get('register')
  async registerAction(
    @Body() payload: RegisterBodyDto,
  ): Promise<RegisterResponseDto> {
    return await this.authService.registerAction(payload);
  }
}
