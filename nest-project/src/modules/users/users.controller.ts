import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  CreateUserDto,
  UpdateUserDto,
  UpdateUserPropertiesDto,
} from './dtos/user.dto';
import { NextFunction, Request, Response } from 'express';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../guards/roles.decorator';
import { AuthGuard } from '../../guards/auth.guard';
import { WorkingHoursGuard } from '../../guards/working-hours.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Get()
  getUsers(@Query('search') search: string): Promise<UpdateUserDto[]> {
    return this.usersService.findAll(search);
  }

  // @Get(':id')
  // getUser(
  //   @Param('id') id: string,
  //   @Req() req: Request,
  // ): Promise<UpdateUserDto> {
  //   // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  //   console.log(`REQUEST ID ${req.headers['x-request-id']}`);
// 
  //   console.log(`LOCALE IS: ${req['locale']}`);
// 
  //   return this.usersService.findOne(Number(id));
  // }

  @Post()
  @HttpCode(201)
  createUser(@Body() user: CreateUserDto): Promise<CreateUserDto> {
    return this.usersService.create(user);
  }

  @Put(':id')
  @HttpCode(200)
  updateUser(
    @Body() user: CreateUserDto,
    @Param('id') id: number,
  ): Promise<UpdateUserDto> {
    return this.usersService.update(Number(id), user);
  }

  @Patch(':id')
  updateUserProperties(
    @Param('id') id: number,
    @Body() userProperties: Partial<UpdateUserPropertiesDto>,
  ) {
    return this.usersService.update(Number(id), userProperties);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id') id: number) {
    this.usersService.remove(Number(id));
  }

  @UseGuards(WorkingHoursGuard)
  @Get('workday')
  isItWorkDayNow() {
    return 'Yes, you called during working hours';
  }
}
