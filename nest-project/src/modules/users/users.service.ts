import { Injectable, OnModuleInit } from '@nestjs/common';
import { UserDto } from './dtos/user.dto';

export interface IUser extends UserDto {
  id: number;
}

@Injectable()
export class UsersService implements OnModuleInit {
  private users: IUser[] = [];
  private currentId: number = 1;

  onModuleInit() {
    console.log('UsersService initialized');
  }

  getUsers() {
    return this.users;
  }

  createUser(userData: UserDto) {
    const newUser = {
      id: this.currentId,
      ...userData,
    };
    this.users.push(newUser);
    this.currentId++;
    return newUser;
  }
}
