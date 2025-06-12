import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { LoggerModule } from '../../logger/logger.module';
import { UsersRepository } from './repository/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  imports: [
    LoggerModule.forRoot({ debug: true }),
    TypeOrmModule.forFeature([User]),
  ],
})
export class UsersModule {}
