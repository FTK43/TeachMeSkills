import {Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put} from '@nestjs/common';
import { UsersService } from './users.service';
import {CreateUserDto, UpdatedUserPropertiesDto, UpdateUserDto, UpdateUserPropertiesDto} from "./dtos/user.dto";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(): UpdateUserDto[] {
    return this.usersService.getUsers();
  }

  @Get(':id')
  getUser(@Param('id') id: string): UpdateUserDto {
    return this.usersService.findUserById(Number(id));
  }

  @Post()
  @HttpCode(201)
  createUser(@Body() user: CreateUserDto): CreateUserDto {
    return this.usersService.createUser(user);
  }

  @Put(':id')
  @HttpCode(200)
  updateUser(@Body() user: CreateUserDto, @Param('id') id: number ): UpdateUserDto {
    const userToUpdate: UpdateUserDto = {
      ...user,
      id: Number(id),
    };
    return this.usersService.updateUser(userToUpdate);
  }

  @Patch(':id')
  updateUserProperties(@Param('id') id: number, @Body() userProperties: UpdateUserPropertiesDto) {
    const userToUpdate: UpdatedUserPropertiesDto = {
      ...userProperties,
      id: Number(id)
    };
    return this.usersService.updateUserProperties(userToUpdate)
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id') id: number) {
    this.usersService.deleteUser(Number(id));
  }
}
