import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Role } from 'src/enums/role.enum';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  name: string;

  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  role: Role;
}
