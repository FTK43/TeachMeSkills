import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from 'src/guards/auth.guard';

@Module({
  imports: [
    JwtModule.register({
      secret: 'super-secret-key-super-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthGuard],
  exports: [JwtModule, AuthGuard],
})
export class AuthModule {}
