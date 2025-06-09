import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/users/entities/user.entity';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { RequestIdMiddleware } from './middlewares/request-id.middleware';
import { LocaleMiddleware } from './middlewares/locale.middleware';
import { ChangeRoleLoggerMiddleware } from './middlewares/change-role-logger.middleware';
import { BullModule } from '@nestjs/bull';
import { EmailModule } from './modules/email/email.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'postgres',
      entities: [User],
      synchronize: true,
    }),
    UsersModule,
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    EmailModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(LoggerMiddleware, RequestIdMiddleware, LocaleMiddleware)
      .forRoutes('*')
      .apply(ChangeRoleLoggerMiddleware)
      .forRoutes('users/changeRole');
  }
}
