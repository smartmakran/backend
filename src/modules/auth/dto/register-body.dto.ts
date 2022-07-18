import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsPhoneNumber,
} from 'class-validator';

export class RegisterBodyDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('IR')
  phone: string;

  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
