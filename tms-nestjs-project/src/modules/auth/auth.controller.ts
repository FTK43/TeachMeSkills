import {
  Body,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  Controller,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserSignInDto } from './dto/signInDto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInData: UserSignInDto) {
    return this.authService.signIn(signInData);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
