import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { LoggerModule } from '../shared/logger/logger.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    LoggerModule.forRoot({ level: 'debug' }),
    forwardRef(() => AuthModule),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
