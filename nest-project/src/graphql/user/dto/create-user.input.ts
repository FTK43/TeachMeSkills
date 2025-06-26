import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, Length } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @Length(2, 30)
  name: string;

  @Field()
  @IsEmail()
  email: string;
}
