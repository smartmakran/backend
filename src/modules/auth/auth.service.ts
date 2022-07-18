import { BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';
import { JwtPayload } from 'src/modules/auth/interface/jwt-payload.interface';
import { User, UserDocument } from 'src/schema/user.schema';
import {
  LoginBodyDto,
  LoginResponseDto,
  RegisterBodyDto,
  RegisterResponseDto,
} from './dto';

export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async register(payload: RegisterBodyDto): Promise<RegisterResponseDto> {
    const user = await this.userModel.findOne({ phone: payload.phone });
    if (user) {
      throw new Error('این شماره تلفن قبلا ثبت شده است');
    }

    const data = {
      fullName: payload.fullName,
      phone: payload.phone,
      password: this.hashPassword(payload.password),
    };

    await this.userModel.create(data);

    return plainToInstance(RegisterResponseDto, {
      status: 'success',
      message: 'ثبت‌نام با موفقیت انجام شد',
    });
  }

  async login(payload: LoginBodyDto): Promise<LoginResponseDto> {
    const user = await this.userModel.findOne({ phone: payload.phone });
    if (!user || !this.comparePassword(payload.password, user.password)) {
      throw new BadRequestException('شماره تلفن یا رمز عبور اشتباه است');
    }

    const token = this.generateToken(user);

    return plainToInstance(LoginResponseDto, {
      status: 'success',
      message: 'ورود با موفقیت انجام شد',
      token,
    });
  }

  private hashPassword(password: string): string {
    const salt = genSaltSync(+process.env.SALT_ROUNDS);
    return hashSync(password, salt);
  }

  private comparePassword(password: string, hash: string): boolean {
    return compareSync(password, hash);
  }

  private generateToken(user: UserDocument): string {
    const jwtPayload: JwtPayload = {
      _id: user._id,
      phone: user.phone,
    };
    return this.jwtService.sign(jwtPayload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  }
}
