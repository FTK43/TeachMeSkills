import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from '../create-user/create-user.dto';

export class UpdatePropertiesUserDto extends PartialType(CreateUserDto) {}
