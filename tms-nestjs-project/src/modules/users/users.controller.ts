import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dtos/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(): UserDto[] {
    return this.usersService.getUsers();
  }

  @Post()
  createUser(@Body() user: UserDto): void {
    return this.usersService.createUser(user);
  }
}
