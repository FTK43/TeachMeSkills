import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '../../guards/auth.guard';

@Module({
  imports: [
    JwtModule.register({
      secret: 'my_fake_secret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthGuard],
  exports: [JwtModule, AuthGuard],
})
export class AuthModule {}
