import { Injectable, OnModuleInit } from '@nestjs/common';
import { UserDto } from './dtos/user.dto';

const users: UserDto[] = [];

@Injectable()
export class UsersService implements OnModuleInit {
  onModuleInit() {
    console.log('UsersService initialized');
  }

  getUsers(): UserDto[] {
    return users;
  }

  createUser(user: UserDto): void {
    users.push(user);
  }
}
