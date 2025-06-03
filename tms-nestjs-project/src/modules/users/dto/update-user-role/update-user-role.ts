import { IsNotEmpty, IsString } from 'class-validator';
import { Role } from 'src/enums/role.enum';

export class UpdateUserRoleDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @IsString()
  role: Role;
}
