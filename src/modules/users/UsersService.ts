import {
  Injectable,
  Scope,
  OnModuleInit,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { LoggerService } from 'src/logger/logger.service';
import { UsersRepository } from './repository/users.repository';
import { User } from './user.entity';

@Injectable({ scope: Scope.TRANSIENT })
export class UsersService implements OnModuleInit {
  constructor(
    @Inject('APP_CONFIG') private readonly logger: LoggerService,
    private readonly usersRepository: UsersRepository,
  ) {}

  onModuleInit(): any {
    this.logger.log('UsersService Inititalized');
  }

  findAll() {
    return this.usersRepository.find();
  }

  create(userData: Partial<User>) {
    const user: User = this.usersRepository.create(userData);
    return this.usersRepository.save(user);
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User with id: ${id} not found!`);
    }

    return user;
  }
}
