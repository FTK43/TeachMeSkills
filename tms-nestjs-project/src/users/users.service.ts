import {
  Inject,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { LoggerService } from 'src/logger/logger.service';
import { LoggerImportanceLevel } from 'src/logger/types';
import { Users } from './entities/user.entity';
import { UsersRepository } from './repository/users.repository';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @Inject('APP_CONFIG') private readonly logger: LoggerService,
    private readonly usersRepository: UsersRepository,
  ) {}

  onModuleInit(): any {
    console.log('UsersService Initialized.');
  }

  create(userData: Partial<Users>): Promise<Users> {
    const user = this.usersRepository.create(userData);
    this.logger.logMessage(LoggerImportanceLevel.DEBUG, 'User created');
    return this.usersRepository.save(user);
  }

  findAll(search?: string): Promise<Users[]> {
    return this.usersRepository.findActiveUsers(search);
  }

  async findOne(id: number): Promise<Users> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with email ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateData: Partial<Users>): Promise<Users> {
    const user = await this.findOne(id);
    Object.assign(user, updateData);
    return this.usersRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.usersRepository.remove(user);
  }

  async softRemove(id: number): Promise<void> {
    await this.usersRepository.softDelete(id);
  }

  async restore(id: number): Promise<void> {
    await this.usersRepository.restore(id);
  }
}
