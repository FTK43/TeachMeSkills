import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from './user.model';
import { CreateUserInput } from './dto/create-user.input';
import { UsersService } from '../modules/users/users.service';
import { Post } from '../post/post.model';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UsersService) {}

  private users: User[] = [
    { id: 1, name: 'Andrey', email: 'andrey@tms.com' },
    { id: 2, name: 'Anton', email: 'anton@tms.com' },
    { id: 3, name: 'Inna', email: 'inna@tms.com' },
  ];

  private testPosts: Post[] = [
    { id: 1, title: 'Post by Andrey', content: 'Post by Andrey' },
    { id: 2, title: 'Post by Anton', content: 'Post by Anton' },
    { id: 3, title: 'Post by Inna', content: 'Post by Inna' },
  ];

  @Query(() => [User])
  getUser(): User[] {
    return this.users;
  }

  @Query(() => User, { nullable: true })
  getUserById(@Args('id', { type: () => Int }) id: number): any {
    return this.userService.findOne(id);
  }

  @Query(() => User, { nullable: true })
  getUserByEmail(@Args('email') email: string): any {
    return this.userService.findOneByEmail(email);
  }

  @Mutation(() => User)
  createUser(@Args('input') input: CreateUserInput): User {
    const newUser = {
      id: this.users.length + 1,
      ...input,
    };
    this.users.push(newUser);

    return newUser;
  }

  @ResolveField(() => [Post])
  posts(@Parent() user: User): Post[] {
    return this.testPosts.filter((p) => p.id === user.id);
  }
}
