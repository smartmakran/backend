import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsDateString,
  IsMongoId,
  IsNumber,
  IsString,
} from 'class-validator';

class CreateBodyDto {
  @ApiProperty({})
  @IsMongoId()
  pond: string;

  @ApiProperty({})
  @IsDateString()
  createdAt: Date;
}

export class CreateSamplingBodyDto extends CreateBodyDto {
  @ApiProperty({})
  @IsNumber()
  averageSize: number;
}

export class CreateFeedingBodyDto extends CreateBodyDto {
  @ApiProperty({})
  @IsNumber()
  amount: number;

  @ApiProperty({})
  @IsString()
  type: string;
}

export class CreateChangingWaterBodyDto extends CreateBodyDto {
  @ApiProperty({})
  @IsNumber()
  amount: number;
}

export class CreateTransparencyBodyDto extends CreateBodyDto {
  @ApiProperty({})
  @IsNumber()
  amount: number;
}
