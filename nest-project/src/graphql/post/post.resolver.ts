import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Post } from './post.entity';
import { CreatePostInput } from './create-post.input';
import { PostService } from './post.service';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation(() => Post)
  async createPost(@Args('input') input: CreatePostInput): Promise<Post> {
    return this.postService.createPost(input);
  }
}
