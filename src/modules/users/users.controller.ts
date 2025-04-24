import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { User, UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './classes';
import { LoggerService } from '../shared/logger/logger.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly loggerService: LoggerService,
  ) {}

  @Get()
  getUsers(): User[] {
    const users = this.usersService.getUsers();
    this.loggerService.log(`Users received: ${JSON.stringify(users)}`);

    return users;
  }
  @Get(':id')
  getUserById(@Param() id: number): User {
    const user = this.usersService.getUserById(id);
    if (!user) throw new NotFoundException('No user with such id found');
    return user;
  }

  @Post()
  @HttpCode(201)
  postUser(@Body() userData: CreateUserDto) {
    this.usersService.createUser(userData);
    this.loggerService.log(`User has been created: ${userData.username}`);
  }

  @Put(':id')
  updateUser(@Body() userData: CreateUserDto, @Param() id: number) {
    const userToUpdate: UpdateUserDto = { ...userData, id };
    this.usersService.updateUser(userToUpdate);
  }

  @Patch(':id')
  updateUserPartial(@Body() user: Partial<CreateUserDto>, @Param() id: number) {
    const updateData: Partial<UpdateUserDto> = { ...user, id };
    this.usersService.partiallyUpdateUser(updateData);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param() id: number) {
    this.usersService.deleteUserById(id);
  }
}
