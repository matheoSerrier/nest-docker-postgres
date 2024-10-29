import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() userData: Partial<User>): Promise<User> {
    return await this.userService.create(userData);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    return await this.userService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() userData: Partial<User>): Promise<User> {
    return await this.userService.update(id, userData);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.userService.remove(id);
  }
}
