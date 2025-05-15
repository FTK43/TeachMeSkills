import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { LoggerModule } from '../logger/logger.module';
import { LoggerImportanceLevel } from 'src/logger/types';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { UsersRepository } from './repository/users.repository';

@Module({
  imports: [
    LoggerModule.forRoot(LoggerImportanceLevel.DEBUG),
    TypeOrmModule.forFeature([Users]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
})
export class UsersModule {}
