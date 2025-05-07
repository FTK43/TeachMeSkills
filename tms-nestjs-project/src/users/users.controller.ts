import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user/update-user.dto.ts';
import { UpdatePropertiesUserDto } from './dto/update-properties-user/update-properties-user.dto';
import { Users } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() user: CreateUserDto): Promise<Users | void> {
    try {
      return await this.userService.create(user);
    } catch (error) {
      if (error) {
        throw new HttpException(
          'user with this email already exists',
          HttpStatus.CONFLICT,
        );
      }
    }
  }

  @Get()
  getUsers(@Query('search') search: string): Promise<UpdateUserDto[]> {
    return this.userService.findAll(search);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  updateUser(
    @Body() user: CreateUserDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CreateUserDto> {
    return this.userService.update(id, user);
  }

  @Patch(':id')
  updateUserProperties(
    @Param('id', ParseIntPipe) id: number,
    @Body() userProperties: UpdatePropertiesUserDto,
  ) {
    return this.userService.update(id, userProperties);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }

  @Delete(':id')
  @HttpCode(204)
  softDeleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.softRemove(id);
  }
}
