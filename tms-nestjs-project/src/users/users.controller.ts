import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user/update-user.dto.ts';
import { UpdatePropertiesUserDto } from './dto/update-properties-user/update-properties-user.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  @HttpCode(201)
  create(@Body() user: CreateUserDto): CreateUserDto {
    return this.userService.create(user);
  }

  @Get()
  get(): CreateUserDto[] {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param() id: number) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  updateUser(@Body() user: CreateUserDto, @Param() id: number) {
    const userToUpdate: UpdateUserDto = {
      ...user,
      id,
    };
    return this.userService.updateUser(id, userToUpdate);
  }

  @Patch(':id')
  updateUserProperties(
    @Param() id: number,
    @Body() user: UpdatePropertiesUserDto,
  ) {
    const userToUpdate = {
      ...user,
      id,
    };
    return this.userService.updateUserProperties(id, userToUpdate);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param() id: number) {
    return this.userService.deleteUser(id);
  }
}
