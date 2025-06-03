import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserSignInDto } from './dto/signInDto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInData: UserSignInDto): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneByName(signInData.name);
    if (user?.password !== signInData.password) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.name, role: user.role };

    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
