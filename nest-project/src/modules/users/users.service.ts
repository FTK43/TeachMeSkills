import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(private readonly userRepository: UserRepository) {}

  create(userData: Partial<User>) {
    const user: User = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  findAll(search?: string): Promise<User[]> {
    return this.userRepository.findActiveUsers(search);
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User with id ${id} - not found `);
    }

    return user;
  }

  async update(id: number, updateData: Partial<User>) {
    const user = await this.findOne(Number(id));

    Object.assign(user, updateData);
    return this.userRepository.save(user);
  }

  async delete(id: number) {
    const user = await this.findOne(id);
    return this.userRepository.softRemove(user);
  }

  onModuleInit() {
    console.log('UsersService initialized');
  }
}
