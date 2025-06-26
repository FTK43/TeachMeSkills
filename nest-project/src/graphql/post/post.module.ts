import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostLoader } from './post.loader';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { PostResolver } from './post.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [PostService, PostLoader, PostResolver],
  exports: [PostLoader],
})
export class PostModule {}
