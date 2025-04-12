import { Body, Controller, Get, Post } from '@nestjs/common';
import { IUser, UsersService } from './users.service';
import { UserDto } from './dtos/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(): IUser[] {
    return this.usersService.getUsers();
  }

  @Post()
  createUser(@Body() userData: UserDto): IUser {
    return this.usersService.createUser(userData);
  }
}
