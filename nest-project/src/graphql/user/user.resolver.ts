/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { Post } from '../post/post.entity';
import { UserService } from './user.service';
import { User } from './user.entity';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  private users: User[] = [
    { id: 1, name: 'Andrey', email: 'andrey@tms.com' },
    { id: 2, name: 'Anton', email: 'anton@tms.com' },
    { id: 3, name: 'Inna', email: 'inna@tms.com' },
  ];

  @Query(() => [User])
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query(() => [User])
  getUser(): User[] {
    return this.users;
  }

  // @Query(() => User, { nullable: true })
  // getUserById(@Args('id', { type: () => Int }) id: number): any {
  //   return this.userService.findOne(id);
  // }

  // @Query(() => User, { nullable: true })
  // getUserByEmail(@Args('email') email: string): any {
  //   return this.userService.findOneByEmail(email);
  // }

  @Mutation(() => User)
  async createUser(@Args('input') input: CreateUserInput): Promise<User> {
    return this.userService.createUser(input);
  }

  @ResolveField(() => [Post])
  posts(@Parent() user: User, @Context() context) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return context.loaders.postLoader.batchPosts.load(user.id);
  }
}
