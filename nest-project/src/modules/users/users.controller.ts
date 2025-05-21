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

  @Post('bulk')
  @HttpCode(201)
  bulkCreate(@Body() users: CreateUserDto[]) {
    return this.usersService.bulkCreateWithWrite(users);
  }

  @Delete('bulk')
  @HttpCode(204)
  bulkDelete(@Body() filter) {
    this.usersService.bulkDelete(filter);
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
  updateUser(@Body() user: UpdateUserDto, @Param('id') id: number) {
    return this.usersService.update(Number(id), user);
  }

  @Patch(':id')
  updateUserProperties(
    @Param('id') id: number,
    @Body() userProperties: UpdateUserPropertiesDto,
  ) {
    return this.usersService.update(Number(id), userProperties);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param('id') id: number) {
    await this.usersService.delete(Number(id));
  }
}
