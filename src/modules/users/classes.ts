import { IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @MinLength(3, { message: 'username is too short' })
  username: string;

  @MinLength(3, { message: 'password is too short' })
  password: string;
}

export class UpdateUserDto extends CreateUserDto {
  id: number;
}
