import { Injectable, OnModuleInit, Scope } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-uset.dto';

const users: User[] = [];
@Injectable({ scope: Scope.TRANSIENT })
export class UsersService implements OnModuleInit {
  onModuleInit(): any {
    console.log('UsersService Inititalized');
  }

  public findAll(): User[] {
    return users;
  }

  public create({ username, email }: CreateUserDto) {
    const user = new User(username, email);
    users.push(user);

    return user;
  }
}
