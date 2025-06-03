import {
  Inject,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { LoggerService } from 'src/modules/logger/logger.service';
import { LoggerImportanceLevel } from 'src/modules/logger/types';
import { Users } from './entities/user.entity';
import { UsersRepository } from './repository/users.repository';
import { Role } from 'src/enums/role.enum';

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
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async findOneByName(name: string): Promise<Users> {
    const user = await this.usersRepository.findOneBy({ name });
    if (!user) {
      throw new NotFoundException(`User with name ${name} not found`);
    }
    return user;
  }

  async update(id: number, updateData: Partial<Users>): Promise<Users> {
    const user = await this.findOne(id);
    Object.assign(user, updateData);
    return this.usersRepository.save(user);
  }

  // async updateProperties():Promise<Users> {

  // }

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

  async updateUserRole(id: number, newRole: Role): Promise<Users> {
    const user = await this.findOne(id);
    console.log((user.role = newRole));
    console.log(user);
    return this.usersRepository.save(user);
  }
}
