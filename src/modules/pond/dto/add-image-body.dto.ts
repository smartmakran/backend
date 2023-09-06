import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBase64,
  IsDateString,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class AddImageBodyDto {
  @ApiProperty({
    description: 'فایل مورد نظر',
    type: String,
    example: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADEAAAAxCAYAAABznEEcAAAACXBIWXMAAAsSAAALEgHS3X78AAAEeklEQVRogd1aMW8jRRT+glxQIJ0LJJoTm4KC7kIFXZwfgM4n0VCdI7ZZUeD0SLn8gvM1bLMSzi/AES0SdoEEBcLu6M4rXXFX4UgUFEhBL3zPvExm7N3NGG75Gtu7X2bfNzPvzXtvs3d1dQUXSZp3AfQB7ANYAZiURba8RSSSNB+QKxhH5ApvwJ/LssjGPt4tERQwBfDAXL4E0CuLbN6Uy7HnDlfwqCyySWBivnYuX5RF1ne5b3iEjfggMeYMwALAPQBDD3focGfkPvEYZbnPxCAzhsvt0g6Q94x/9zBJ84MqIlRpvywyMabH3z0Pd+hw+xu4ui2GZZENOaNi2GHABpmMhfCEL1svNPZ6O1HhfQDf8t6R4X3vuRa6rtc+BfDSc/1jAL/zu676CQC7/UTwYwDnxvhPAHwO4AcAXwq/LLLVtYh3P/vKt6/bgLXvdbh/VcDMLK8o/pPf7/P7S0eccn8C8IfhCl443A8BvAngZ7MSbwN4SyKPw5WolAB4BeBXXhNb3yP3fW43CQj7ckMd5aQsslGS5lMa9x33eRBJmssgDwH8yH27iTvmFnnhizAOV2z6BcA7AD5yw7C5L0JvOLbuSY0Kp0mabxRhuF/U4EqEmTACecHwPOO9qRuR3PB9KzoxZp8bIQOXY7hThtYqXHnwsQox0SoEWa2Ss33rHNkogg+UBzxi1Ng4ALfcEbnTLdwxuWcVxl1xq58Ezqg1JDqpDxxxZluBJM2vKHavYww+SNK8LRpuoMMQJ3j6mthUGx0TsxfMWNuCdbpit9OwjT6BUHRqG/4XIjoVOI3AU1ZP6XGoKvvXRbBcDBkzZ3ps76vzrX3NlJwi0pd6jHyV3ibUXYlVoIhZG5ykuaTHA0kzzLmzRLjkdFF7xWr5BFOBY+byITw2yeBCRXB7bRNw3mTbNXHsidnrIZzSaD13uhVmeFZhXC+aiOhuS8gIWzN8U6FyPAzU5ltRWwQLlB67ELMtW6vSkBznWIqyJgM0CrGsDfpsw6ijX7JkVEwqzqw0xRqtgOJO5wRn7sbsMQKtnOh0Qv/Y11BsiqI7nx9RDzueAT1PwSPnx5QrJw4/3Va/10E0EXI+GOMPXCFcoafaamnqxD7EzJ3G9Il7TiNMMTd+c+hrRzZFTBEJPy9Yo1usGAzs7Ae7HXURU0TJz56ZZVmdD+jk7vkSbOn/lyLUwIk5qSes3eXzNzbPwPQimohojs3Mcw908iTNR+wv3aBJ2zR2Wh47xHY5+6FMt7ut39QEsSu7kREwM35yYSJTlbyrFmKL0HdxZ+XfqcSSYoYmIXztRaizqsGD8p+8SI2P3lGJLeKJmXnBPlv6z+nkl7tYiaiOrWm6OLh5z6FY8N1etNCq2FW3Y25OcMWDXXUYd9V3SviOQ1+U6DuMaEmfxa5ElEw5lvyuNYcvMbwzdiWiR4OHfMO5Yg4V3R+wK59wjF3B854tJuxKREuNdw33pWWHyy6hcMykrQ3Qw/RSRYxYtEtec9qW1SCuD87r/+1w/r+pDRA/k2bDHAD+Ahn/td4wdwRRAAAAAElFTkSuQmCC`,
    required: true,
  })
  // @IsBase64()
  @IsString()
  file: string;

  @ApiProperty({
    example: 's',
    description: 'نوع تصویر ',
  })
  @IsString()
  @IsEnum(['s', 'w'])
  @IsNotEmpty()
  type: 's' | 'w';

  @ApiProperty({
    example: '64149c83a0987338321a3327',
    description: 'شناسه حوضچه',
  })
  @IsMongoId()
  @IsNotEmpty()
  pondId: string;

  @ApiProperty({
    example: 'a00794ea-9f57-45ea-9464-82a1a1e8f698',
    description: 'کلید مزرعه',
  })
  @IsString()
  @IsNotEmpty()
  sensorKey: string;

  @ApiProperty({
    example: new Date(),
    description: 'زمان ثبت عکس',
  })
  @IsDateString()
  @IsNotEmpty()
  createdAt: string;
}
