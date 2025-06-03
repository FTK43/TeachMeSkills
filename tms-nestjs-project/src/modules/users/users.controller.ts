import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user/update-user.dto.ts';
import { UpdatePropertiesUserDto } from './dto/update-properties-user/update-properties-user.dto';
import { Users } from './entities/user.entity';
import { Request } from 'express';
import { Roles } from 'src/guards/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { Role } from 'src/enums/role.enum';
import { UpdateUserRoleDto } from './dto/update-user-role/update-user-role';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get()
  getUsers(@Query('search') search: string): Promise<UpdateUserDto[]> {
    return this.userService.findAll(search);
  }

  @Post()
  @HttpCode(201)
  async create(@Body() user: CreateUserDto): Promise<Users | void> {
    try {
      return await this.userService.create(user);
    } catch (error) {
      if (error) {
        throw new HttpException(
          'user with this email already exists',
          HttpStatus.CONFLICT,
        );
      }
    }
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request,
  ): Promise<UpdateUserDto> {
    console.log(`REQUEST ID ${req?.headers['x-request-id']}`);
    console.log(`LOCALE IS ${req['locale']}`);
    return this.userService.findOne(id);
  }

  @Put(':id')
  updateUser(
    @Body() user: CreateUserDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CreateUserDto> {
    return this.userService.update(id, user);
  }

  @Patch(':id')
  updateUserProperties(
    @Param('id', ParseIntPipe) id: number,
    @Body() userProperties: UpdatePropertiesUserDto,
  ) {
    return this.userService.update(id, userProperties);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }

  @Delete('softDelete/:id')
  @HttpCode(204)
  softDeleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.softRemove(id);
  }

  @Patch('updateUserRole/:id')
  updateUserRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() userRole: UpdateUserRoleDto,
  ) {
    return this.userService.update(id, userRole);
  }
}
