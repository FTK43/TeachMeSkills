/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { User } from './modules/users/entities/user.entity';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { RequestIdMiddleware } from './middlewares/request-id.middleware';
import { LocaleMiddleware } from './middlewares/locale.middleware';
import * as redisStore from 'cache-manager-ioredis';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { Keyv } from 'keyv';
import { CacheableMemory } from 'cacheable';
import { createKeyv } from '@keyv/redis';
import { BullModule } from '@nestjs/bull';
import { EmailModule } from './modules/email/email.module';
import { ScheduleModule } from '@nestjs/schedule';
import { UploadModule } from './modules/upload/upload.module';
import { UploadMetadataEntity } from './modules/upload/entities/upload-metadata.entity';
import { AppGateway } from './ws/app.gateway';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AppResolver } from './app.resolver';
import { UserResolver } from './graphql/user/user.resolver';
import { UsersService } from './modules/users/users.service';
import { UserModule } from './graphql/user/user.module';
import { MessageModule } from './graphql/message/message.module';
import { PostLoader } from './graphql/post/post.loader';
import { PostService } from './graphql/post/post.service';
import { LoaderMiddleware } from './graphql/post/loader.middleware';
import { PostModule } from './graphql/post/post.module';
import { Post } from './graphql/post/post.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'myuser2',
      password: 'password',
      database: 'mydb2',
      entities: [User, Post, UploadMetadataEntity],
      synchronize: true,
      // logging: true,
    }),
    UsersModule,
    CacheModule.registerAsync({
      useFactory: async () => {
        return {
          stores: [
            new Keyv({
              store: new CacheableMemory({ ttl: 10, lruSize: 5000 }),
            }),
            createKeyv('redis://localhost:6379'),
          ],
        };
      },
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    EmailModule,
    ScheduleModule.forRoot(),
    UploadModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
      installSubscriptionHandlers: true,
      context: ({ req }) => ({
        req,
        loaders: req.loaders,
      }),
    }),
    UserModule,
    MessageModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: CacheInterceptor,
    // },
    AppGateway,
    AppResolver,
  ],
  exports: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        // LoggerMiddleware,
        RequestIdMiddleware,
        LocaleMiddleware,
        LoaderMiddleware,
      )
      .forRoutes('*');
  }
}
