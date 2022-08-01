import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginBodyDto {
  @ApiProperty({
    example: '09108869419',
  })
  @IsNotEmpty({ message: 'شماره تلفن الزامی است' })
  @IsString({ message: 'شماره تلفن باید از نوع رشته باشد' })
  phone: string;

  @ApiProperty({ example: '12345' })
  @IsNotEmpty({ message: 'رمز عبور الزامی است' })
  @IsString({ message: 'رمز عبور باید از نوع رشته باشد' })
  password: string;
}
