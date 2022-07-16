import { Controller, Inject, Post, SetMetadata } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('ثبت‌نام و ورود')
export class AuthController {
  @Inject() private readonly authService: AuthService;

  @Post('register')
  @SetMetadata('roles', ['user'])
  async register() {}
}
