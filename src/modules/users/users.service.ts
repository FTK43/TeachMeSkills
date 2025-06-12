import {
  Inject,
  Injectable,
  NotFoundException,
  OnModuleInit,
  Scope,
} from '@nestjs/common';
import { User } from './user.entity';
import { LoggerService } from '../../logger/logger.service';
import { UsersRepository } from './repository/users.repository';
let users: User[] = [];
@Injectable({ scope: Scope.TRANSIENT })
export class UsersService implements OnModuleInit {
  constructor(
    @Inject('APP_CONFIG') private readonly logger: LoggerService,
    private readonly usersRepository: UsersRepository,
  ) {}

  onModuleInit(): any {
    this.logger.log('UsersService Inititalized');
  }

  findAll(search?: string): Promise<User[]> {
    return this.usersRepository.findAllActiveUsers(search);
  }

  create(userData: Partial<User>): Promise<User> {
    const user: User = this.usersRepository.create(userData);
    return this.usersRepository.save(user);
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User with id: ${id} not found!`);
    }

    return user;
  }

  async update(id: number, updateData: Partial<User>): Promise<User> {
    const user = await this.findOne(id);
    const updatedUser = this.usersRepository.merge(user, updateData);

    return this.usersRepository.save(updatedUser);
  }

  async removeHard(id: number): Promise<User> {
    const user = await this.findOne(id);

    return this.usersRepository.remove(user);
  }

  async removeSoft(id: number): Promise<User> {
    const user = await this.update(id, { isActive: false });

    return this.usersRepository.softRemove(user);
  }
}
