import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async createUser(input: CreateUserInput): Promise<User> {
    const userCreated = this.userRepo.create(input);
    return this.userRepo.save(userCreated);
  }
}
