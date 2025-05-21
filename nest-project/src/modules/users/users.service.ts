import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRepository } from './repository/user.repository';
import { User } from './entities/user.entity';
import { UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    // private readonly userRepository: UserRepository,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  create(userData: Partial<User>) {
    const createdUser = new this.userModel(userData);
    return createdUser.save();
  }

  bulkCreate(users: Partial<User>[]) {
    const createdUsers = users.map((userData) => new this.userModel(userData));
    return this.userModel.bulkSave(createdUsers);
  }

  async bulkCreateWithWrite(users: Partial<User>[]) {
    const operations = users.map(user => ({
      insertOne: {
        document: user,
      },
    }));

    return this.userModel.bulkWrite(operations);
  }

  findAll(search?: string) {
    const filter = search
      ? { username: { $regex: search, $options: 'i' }, isActive: true }
      : { isActive: true };
    return this.userModel.find(filter).select('-_id -__v').exec();
  }

  async findOne(id: number) {
    const user = await this.userModel
      .findOne({ id })
      .select('-_id -__v')
      .exec();

    if (!user) {
      throw new NotFoundException(`User with id ${id} - not found `);
    }

    return user;
  }

  async update(id: number, updateData: Partial<User>) {
    const user = await this.userModel
      .findOneAndUpdate({ id }, updateData, { new: true })
      .select('-_id -__v')
      .exec();
    if (!user) {
      throw new NotFoundException(`User with id ${id} - not found`);
    }
    return user;
  }

  async delete(id: number) {
    const user = await this.userModel
      .findOneAndDelete({ id })
      .select('-_id -__v')
      .exec();
    if (!user) {
      throw new NotFoundException(`User with id ${id} - not found`);
    }
    return user;
  }

  async bulkDelete(filter) {
    console.log('service', filter)
    const deletedUsers = await this.userModel
      .deleteMany(filter)
      .exec();
    if (!deletedUsers) {
      throw new NotFoundException(`No users to be deleted`);
    }
    return deletedUsers;
  }

  onModuleInit() {
    console.log('UsersService initialized');
  }
}
