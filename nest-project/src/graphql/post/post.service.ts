/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { In, Repository } from 'typeorm';
import { CreatePostInput } from './create-post.input';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly repo: Repository<Post>,
  ) {}

  async findByUserIds(userIds: number[]): Promise<Post[]> {
    return this.repo.find({
      where: {
        userId: In(userIds),
      },
    });
  }

  async createPost(input: CreatePostInput): Promise<Post> {
    const post = this.repo.create(input);
    return this.repo.save(post);
  }
}
