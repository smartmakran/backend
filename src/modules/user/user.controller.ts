import { Roles } from '@modules/auth/decorators/roles.decorator';
import { Role } from '@modules/auth/enum/role.enum';
import {
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Controller,
} from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { User } from 'schema/user.schema';
import { UserService } from './user.service';

@Controller('users')
@Roles(Role.ADMIN)
@ApiSecurity('Authorization')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: Types.ObjectId): Promise<User> {
    return this.userService.getById(id);
  }

  @Post()
  async create(@Body() user: User): Promise<User> {
    return this.userService.create(user);
  }

  @Put(':id')
  async update(
    @Param('id') id: Types.ObjectId,
    @Body() user: User,
  ): Promise<User> {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  async delete(@Param('id') id: Types.ObjectId): Promise<User> {
    return this.userService.delete(id);
  }
}
