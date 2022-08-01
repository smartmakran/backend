import { GetOneUserResponseDto } from '@modules/user/dto/get-one-user-response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LoginResponseDto {
  @ApiProperty({
    type: GetOneUserResponseDto,
    description: 'اطلاعات کاربر',
  })
  @Expose()
  user: GetOneUserResponseDto;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmQ1MDQzOGYwMjBiODg1YTBmNDk0NDYiLCJwaG9uZSI6IjA5MTA4ODY5NDE5IiwiaWF0IjoxNjU5MDg4NjQ1LCJleHAiOjE2NTkxNzUwNDV9.55C_M-UwYwHwHsSGw4kjlxo3mmo0q1Cu5XmYX1w7GqA',
    description: 'توکن',
  })
  @Expose()
  token: string;
}
