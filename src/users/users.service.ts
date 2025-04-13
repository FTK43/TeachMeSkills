import {
  BadRequestException,
  Inject,
  Injectable,
  OnModuleInit,
  Scope,
} from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-uset.dto';
import { LoggerService } from '../logger/logger.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { PatchUserDto } from './dtos/patch-user.dto';

let users: User[] = [];
@Injectable({ scope: Scope.TRANSIENT })
export class UsersService implements OnModuleInit {
  constructor(@Inject('APP_CONFIG') private readonly logger: LoggerService) {}
  onModuleInit(): any {
    console.log('UsersService Inititalized');
  }

  private findById(id: User['id']): User | undefined {
    return users.find((user) => user.id === id);
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

  public update(id, { username, email }: UpdateUserDto) {
    const user = this.findById(id);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    user.username = username;
    user.email = email;

    this.logger.log('User Updated');

    return;
  }

  public patch(userId: number, patchUserDto: PatchUserDto): User {
    const user = this.findById(userId);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    Object.entries(patchUserDto).forEach(([property, value]) => {
      user[property] = value;
    });

    this.logger.log('User Patched');

    return user;
  }

  public delete(userId: number) {
    const user = this.findById(userId);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    users = users.filter((u) => u !== user);

    this.logger.log('User Deleted');

    return;
  }
}
