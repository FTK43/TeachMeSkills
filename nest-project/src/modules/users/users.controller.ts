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
  ChangeUserRoleDto,
  CreateUserDto,
  UpdateUserPropertiesDto,
} from './dtos/user.dto';
import { Request } from 'express';
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
  getUsers(@Query('search') search: string, @Req() req: Request) {
    console.log(`REQUEST ID ${req.headers['x-request-id']}`);
    console.log(`LOCALE IS: ${req['locale']}`);
    return this.usersService.findAll(search);
  }

  @UseGuards(WorkingHoursGuard)
  @Get('workDay')
  isItWorkDayNow() {
    return 'Yes, you called during working hours';
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersService.findOne(Number(id));
  }

  @Post()
  @HttpCode(201)
  createUser(@Body() user: CreateUserDto): Promise<CreateUserDto> {
    return this.usersService.create(user);
  }

  @Put(':id')
  @HttpCode(200)
  updateUser(@Body() user: CreateUserDto, @Param('id') id: number) {
    return this.usersService.update(Number(id), user);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Patch('changeRole')
  changeUserRole(@Body() changeUserRoleData: ChangeUserRoleDto) {
    return this.usersService.changeUserRole(changeUserRoleData);
  }

  @Patch(':id')
  updateUserProperties(
    @Param('id') id: number,
    @Body() userProperties: UpdateUserPropertiesDto,
  ) {
    return this.usersService.update(Number(id), userProperties);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param('id') id: number) {
    await this.usersService.delete(Number(id));
  }
}
