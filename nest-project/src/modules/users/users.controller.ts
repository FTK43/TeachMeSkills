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
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  CreateUserDto,
  UpdateUserDto,
  UpdateUserPropertiesDto,
} from './dtos/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(@Query('search') search: string): Promise<UpdateUserDto[]> {
    return this.usersService.findAll(search);
  }

  @Get(':id')
  getUser(@Param('id') id: string): Promise<UpdateUserDto> {
    return this.usersService.findOne(Number(id));
  }

  @Post()
  @HttpCode(201)
  createUser(@Body() user: CreateUserDto): Promise<CreateUserDto> {
    return this.usersService.create(user);
  }

  @Put(':id')
  @HttpCode(200)
  updateUser(
    @Body() user: CreateUserDto,
    @Param('id') id: number,
  ): Promise<UpdateUserDto> {
    return this.usersService.update(Number(id), user);
  }

  @Patch(':id')
  updateUserProperties(
    @Param('id') id: number,
    @Body() userProperties: Partial<UpdateUserPropertiesDto>,
  ) {
    return this.usersService.update(Number(id), userProperties);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id') id: number) {
    this.usersService.remove(Number(id));
  }
}
