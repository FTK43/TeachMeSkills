import { InputType, Field } from '@nestjs/graphql';
import { IsInt, IsString } from 'class-validator';

@InputType()
export class CreatePostInput {
  @Field()
  @IsInt()
  userId: number;

  @Field()
  @IsString()
  title: string;

  @Field()
  @IsString()
  content: string;
}
