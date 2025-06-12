import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { LoggerModule } from './logger/logger.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/users/user.entity';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { RequestIdMiddleware } from './middlewares/request-id.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { LocaleMiddleware } from './middlewares/locale.middleware';

@Module({
  imports: [
    UsersModule,
    LoggerModule,
    TypeOrmModule.forRoot({
      entities: [User],
      synchronize: true,
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, RequestIdMiddleware, LocaleMiddleware)
      .forRoutes('*');
  }
}
