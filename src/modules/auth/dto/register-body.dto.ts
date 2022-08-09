import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsPhoneNumber,
} from 'class-validator';

export class RegisterBodyDto {
  @ApiProperty({
    example: 'امیر رحیمی',
    description: 'نام و نام خانوادگی',
  })
  @IsNotEmpty({ message: 'نام و نام خانوادگی اجباری است.' })
  @IsString({ message: 'نام و نام خانوادگی باید از نوع رشته باشد.' })
  fullName: string;

  @ApiProperty({
    example: '09108869419',
    description: 'شماره تلفن',
  })
  @IsString({ message: 'شماره تلفن باید از نوع رشته باشد.' })
  @IsNotEmpty({ message: 'شماره تلفن اجباری است.' })
  @IsPhoneNumber('IR', { message: 'شماره تلفن باید فرمت صحیح داشته باشد.' })
  phone: string;

  @ApiProperty({
    example: '12345',
    description: 'رمز عبور',
  })
  @IsString({ message: 'رمز عبور باید از نوع رشته باشد.' })
  @IsNotEmpty({ message: 'رمز عبور اجباری است.' })
  @MinLength(8, { message: 'رمز عبور باید حداقل ۸ کاراکتر باشد.' })
  password: string;
}
