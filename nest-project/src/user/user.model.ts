import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Post } from '../post/post.model';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  name?: string;

  @Field()
  email?: string;

  @Field(() => [Post], { nullable: 'items' })
  posts?: Post[];
}
