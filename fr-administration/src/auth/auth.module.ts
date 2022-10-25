import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';

@Module({
  providers: [
    AuthService, 
    LocalStrategy
  ],
  imports: [
    UsersModule,
    PassportModule
  ],
  controllers: [AuthController]
})
export class AuthModule {}
