import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-uset.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  public findAll(@Query('search') search?: string) {
    return this.usersService.findAll(search);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public create(@Body() createUserDto: CreateUserDto): Promise<CreateUserDto> {
    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserDto> {
    return this.usersService.update(id, updateUserDto);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  public patch(
    @Param('id', ParseIntPipe) id: number,
    @Body() patchUserDto: PatchUserDto,
  ): Promise<PatchUserDto> {
    return this.usersService.update(id, patchUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public delete(
    @Param('id', ParseIntPipe) id: number,
    @Query('soft') softDelete?: boolean,
  ) {
    if (softDelete) {
      return this.usersService.removeSoft(id);
    }

    return !softDelete && this.usersService.removeHard(id);
  }
}
