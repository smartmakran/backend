import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';
import { User, UserDocument } from 'schema/user.schema';
import {
  LoginBodyDto,
  LoginResponseDto,
  RegisterBodyDto,
  RegisterResponseDto,
} from './dto';
import { JwtPayload } from './interface/jwt-payload.interface';

export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async register(payload: RegisterBodyDto): Promise<RegisterResponseDto> {
    const user = await this.userModel.findOne({ phone: payload.phone });
    if (user) {
      throw new ConflictException('این شماره تلفن قبلا ثبت شده است');
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
      throw new UnauthorizedException('کاربری با این مشخصات یافت نشد.');
    }

    const token = this.generateToken(user);

    return plainToInstance(
      LoginResponseDto,
      {
        user,
        token,
      },
      { excludeExtraneousValues: true, enableImplicitConversion: true },
    );
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
      roles: user.roles,
    };
    return this.jwtService.sign(jwtPayload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  }
}
