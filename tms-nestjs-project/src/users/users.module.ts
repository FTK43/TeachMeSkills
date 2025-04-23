import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { LoggerModule } from '../logger/logger.module';
import { LoggerImportanceLevel } from 'src/logger/types';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [LoggerModule.forRoot(LoggerImportanceLevel.DEBUG)],
})
export class UsersModule {}
