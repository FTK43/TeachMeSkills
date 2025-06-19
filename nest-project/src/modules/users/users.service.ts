import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    private readonly userRepository: UserRepository,
    // private readonly gateway: AppGateway,
  ) {}

  onModuleInit() {
    console.log('UsersService initialized');
  }

  create(userData: Partial<User>): Promise<User> {
    const user: User = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  findAll(search?: string): Promise<User[]> {
    return this.userRepository.findActiveUsers(search);
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User with id ${id} - not found`);
    }

    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new NotFoundException(`User with email ${email} - not found`);
    }

    return user;
  }

  async update(id: number, updateData: Partial<User>): Promise<User> {
    const user = await this.findOne(id);
    Object.assign(user, updateData);

    return this.userRepository.save(user);
  }

  async remove(id: number): Promise<User> {
    const user = await this.findOne(id);
    return this.userRepository.remove(user);
  }

  // notifyAllUsers(message: string) {
  //   this.gateway.emitToAll('userServiceMessage', {
  //     text: message,
  //     timestamp: Date.now(),
  //   });
  // }
}
