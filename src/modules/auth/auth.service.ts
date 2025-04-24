import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  validateUser(userName: string, password: string) {
    const users = this.usersService.getUsers();
    const user = users.find((user) => user.username === userName);

    return user?.password === password;
  }
}
