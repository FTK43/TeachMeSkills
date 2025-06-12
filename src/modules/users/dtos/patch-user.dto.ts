import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-uset.dto';

export class PatchUserDto extends PartialType(CreateUserDto) {}
