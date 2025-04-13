import { Inject, Injectable, OnModuleInit, Scope } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-uset.dto';
import { LoggerService } from '../logger/logger.service';

const users: User[] = [];
@Injectable({ scope: Scope.TRANSIENT })
export class UsersService implements OnModuleInit {
  constructor(@Inject('APP_CONFIG') private readonly logger: LoggerService) {}
  onModuleInit(): any {
    console.log('UsersService Inititalized');
  }

  public findAll(): User[] {
    return users;
  }

  public create({ username, email }: CreateUserDto) {
    const user = new User(username, email);
    users.push(user);

    this.logger.log('User Created');

    return user;
  }
}
