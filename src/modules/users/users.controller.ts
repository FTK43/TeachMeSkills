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
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-uset.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UsersService } from './users.service';
import { Request } from 'express';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/guards/roles.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { HoursGuard } from 'src/guards/hours.guard';
import { TrimPipe } from 'src/pipes/trim.pipe';
import { ExecTimeInterceptor } from 'src/interceptors/exectime.interceptor';
import { ForbiddenWordsPipe } from 'src/pipes/forbidden-words.pipe';

@Controller('users')
@UseInterceptors(ExecTimeInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Get()
  public findAll(@Req() req: Request, @Query('search') search?: string) {
    return this.usersService.findAll(search);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public create(@Body() createUserDto: CreateUserDto): Promise<CreateUserDto> {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(HoursGuard({ start: 5, end: 17 }))
  @Get('working-hours')
  public workingHours() {
    return 'Service available';
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

  @Post('create-tag')
  public createTag(@Body('tag', TrimPipe, ForbiddenWordsPipe) tag: string) {
    return { tag, length: tag.length };
  }
}
