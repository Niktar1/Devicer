import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { LocalStrategy } from './utils/local.strategy';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { RolesModule } from 'src/roles/roles.module';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './utils/jwt.strategy';
import refreshJwtConfig from './config/refresh-jwt.config';
import { RefreshJwtStrategy } from './utils/refresh.strategy';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(refreshJwtConfig),
    RolesModule
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    LocalStrategy,
    JwtStrategy,
    RefreshJwtStrategy,
  ],
  exports: [AuthService]
})
export class AuthModule { }
