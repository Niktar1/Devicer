import { Module } from '@nestjs/common';
// import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './utils/GoogleStrategy';

@Module({
  providers: [GoogleStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
