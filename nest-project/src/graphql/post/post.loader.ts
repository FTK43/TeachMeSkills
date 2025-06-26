import * as DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { PostService } from './post.service';

@Injectable({ scope: Scope.REQUEST })
export class PostLoader {
  constructor(private postService: PostService) {}

  public readonly batchPosts = new DataLoader(async (userIds: number[]) => {
    const posts = await this.postService.findByUserIds(userIds);

    const groupedPosts = userIds.map((id) =>
      posts.filter((post) => post.userId === id),
    );

    return groupedPosts;
  });
}
