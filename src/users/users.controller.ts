import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-uset.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  public findAll() {
    return this.usersService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  public patch(
    @Param('id', ParseIntPipe) id: number,
    @Body() patchUserDto: PatchUserDto,
  ): User {
    return this.usersService.patch(id, patchUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}
