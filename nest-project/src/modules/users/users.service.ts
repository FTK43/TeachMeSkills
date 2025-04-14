import {Injectable, NotFoundException, OnModuleInit} from '@nestjs/common';
import {CreateUserDto, UpdatedUserPropertiesDto, UpdateUserDto} from './dtos/user.dto';

@Injectable()
export class UsersService implements OnModuleInit {
  private users: UpdateUserDto[] = [];
  private currentId: number = 1;

  onModuleInit() {
    console.log('UsersService initialized');
  }

  getUsers() {
    return this.users;
  }

  findUserById(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('User is not found');
    }
    return user;
  }

  createUser(userData: CreateUserDto) {
    const newUser = {
      id: this.currentId,
      ...userData,
    };
    this.users.push(newUser);
    this.currentId++;
    return userData;
  }

  updateUser(data: UpdateUserDto) {
    const updatedUserIndex = this.users.findIndex((user) => user.id === data.id);
    if (updatedUserIndex < 0) {
      throw new NotFoundException('User not found');
    }
    const updatedUser = {
      ...this.users[updatedUserIndex],
      ...data,
    };
    this.users.splice(updatedUserIndex, 1, updatedUser);
    return updatedUser;
  }

  updateUserProperties(data: UpdatedUserPropertiesDto): UpdatedUserPropertiesDto {
    const updatedUserIndex = this.users.findIndex((user) => user.id === data.id);
    if (updatedUserIndex < 0) {
      throw new NotFoundException('User not found');
    }
    const updatedUser = {
      ...this.users[updatedUserIndex],
      ...data,
    };
    this.users.splice(updatedUserIndex, 1, updatedUser);
    return updatedUser;
  }

  deleteUser(id: number) {
    const deletedUserIndex = this.users.findIndex((user)=> user.id === id);
    if (deletedUserIndex < 0) {
      throw new NotFoundException('User not found');
    }
    this.users.splice(deletedUserIndex, 1);
  }
}
