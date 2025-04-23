import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { LoggerService } from 'src/logger/logger.service';
import { CreateUserDto } from './dto/create-user/create-user.dto';
import { UpdateUserDto } from './dto/update-user/update-user.dto.ts';
import { LoggerImportanceLevel } from 'src/logger/types';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(@Inject('APP_CONFIG') private readonly logger: LoggerService) {}
  onModuleInit(): any {
    console.log('UsersService Initialized.');
  }

  private users = [
    { id: 1, name: 'Alice', password: 'secret', email: 'test@tut.by' },
  ];

  create(user: CreateUserDto): CreateUserDto {
    const userToInsert = { ...user, id: this.users.length + 1 };
    this.users.push(userToInsert);
    this.logger.logMessage(LoggerImportanceLevel.DEBUG, 'User created');
    return user;
  }

  findAll(): CreateUserDto[] {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find((user) => user.id === id);
  }

  updateUser(id: number, updateUserDto: UpdateUserDto) {
    const userToUpdate = this.findOne(id);
    if (userToUpdate) {
      userToUpdate.name = updateUserDto.name ?? userToUpdate.name;
      userToUpdate.password = updateUserDto.password ?? userToUpdate.password;
      userToUpdate.email = updateUserDto.email ?? userToUpdate.email;
    }
    return userToUpdate;
  }

  updateUserProperties(id: number, updateUserDto: UpdateUserDto) {
    const existUser = this.findOne(id);
    let userToUpdateProperties: UpdateUserDto = { ...existUser, id };
    if (existUser) {
      userToUpdateProperties = Object.assign(existUser, updateUserDto);
    }
    return userToUpdateProperties;
  }

  deleteUser(id: number) {
    const userToDelete = this.findOne(id);
    if (userToDelete) {
      this.users = this.users.filter((user) => user != userToDelete);
    }
    return this.users;
  }
}
