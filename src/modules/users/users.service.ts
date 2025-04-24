import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './classes';

export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
};
@Injectable()
export class UsersService implements OnModuleInit {
  private users: User[] = [];
  onModuleInit() {
    console.log('UsersService initialized');
  }
  getUsers(): User[] {
    return this.users;
  }
  getUserById(id: number): User | null {
    const user = this.users.find((user) => user.id === id);
    return user || null;
  }

  createUser(user: CreateUserDto) {
    const newUser: User = {
      id: this.users.length + 1,
      ...user,
    };
    this.users.push(newUser);
  }

  updateUser(updatedUser: UpdateUserDto) {
    const userToUpdate = this.users.find(({ id }) => id === updatedUser.id);
    if (!userToUpdate) throw new NotFoundException('No such user');
    this.users = this.users.map((currentUser) => {
      return currentUser.id !== updatedUser.id ? currentUser : updatedUser;
    });
  }

  partiallyUpdateUser(updatedUser: Partial<UpdateUserDto>) {
    const userToUpdate = this.users.find(({ id }) => id === updatedUser.id);
    if (!userToUpdate) throw new NotFoundException('No such user');
    this.users = this.users.map((currentUser) => {
      return currentUser.id !== updatedUser.id
        ? currentUser
        : { ...currentUser, ...updatedUser };
    });
  }

  deleteUserById(id: number) {
    const userToDelete = this.users.find((user) => user.id === id);
    if (!userToDelete) throw new NotFoundException('No such user');
    this.users = this.users.filter((user) => user.id !== id);
  }
}
