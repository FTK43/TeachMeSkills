import { Body, Controller, Post } from '@nestjs/common';
import { User } from '../users/users.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  validateUser(@Body() user: User): boolean {
    return this.authService.validateUser(user.username, user.password);
  }
}
