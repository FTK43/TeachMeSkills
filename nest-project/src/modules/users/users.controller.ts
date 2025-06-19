import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
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
import { TrimPipe } from '../../pipes/trim.pipe';
import { ExectimeInterceptor } from '../../interceptors/exectime.interceptor';
import { ForbiddenWordsPipe } from '../../pipes/forbidden-words.pipe';
import { UserBannedException } from '../../exceptions/user-banned.exception';

@Controller('users')
// @UseInterceptors(ExectimeInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Get()
  getUsers(@Query('search') search: string): Promise<UpdateUserDto[]> {
    return this.usersService.findAll(search);
  }

  @Get(':id')
  getUser(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request,
  ): Promise<UpdateUserDto> {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    //console.log(`REQUEST ID ${req.headers['x-request-id']}`);
    //
    //console.log(`LOCALE IS: ${req['locale']}`);

    return this.usersService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  // @UsePipes(new ValidationPipe({ whitelist: true }))
  createUser(@Body() user: CreateUserDto): Promise<CreateUserDto> {
    console.log(JSON.stringify(user));

    return this.usersService.create(user);
  }

  @Put(':id')
  @HttpCode(200)
  updateUser(
    @Body() user: CreateUserDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UpdateUserDto> {
    return this.usersService.update(id, user);
  }

  @Patch(':id')
  updateUserProperties(
    @Param('id', ParseIntPipe) id: number,
    @Body() userProperties: Partial<UpdateUserPropertiesDto>,
  ) {
    return this.usersService.update(id, userProperties);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    this.usersService.remove(id);
  }

  //@UseGuards(WorkingHoursGuard)
  //@Get('workday')
  //isItWorkDayNow() {
  //  return 'Yes, you called during working hours';
  //}

  @Post('user-tag')
  createUserTag(@Body('tag', ForbiddenWordsPipe, TrimPipe) tag: string) {
    return {
      trimmedTag: tag,
    };
  }

  @Get('/get-user-balance/:id')
  getUserBalance(@Param('id', ParseIntPipe) id: number) {
    if (id === 5) {
      throw new UserBannedException(id);
    }
    return 'ok';
  }

  // @Get('/simulate-api-call')
  // simulateApiCall() {
  //   try {
  //     throw new Error('API METHOD GET USER WALLET NOT FOUND');
  //   } catch {
  //     throw new NotFoundException('Кошелек не найден');
  //   }
  // }

  // @Post('send-to-ws')
  // sendToWs() {
  //   this.usersService.notifyAllUsers('УВЕДОМЛЕНИЕ ОТ СЕРВИСА USERS');
  //   return { success: true };
  // }
}
