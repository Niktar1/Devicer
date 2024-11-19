import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import refreshJwtConfig from './config/refresh-jwt.config';
import { ConfigType } from '@nestjs/config';
import { CurrentUser } from './types/current-user';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
export declare class AuthService {
    private userService;
    private jwtService;
    private refreshTokenConfig;
    constructor(userService: UsersService, jwtService: JwtService, refreshTokenConfig: ConfigType<typeof refreshJwtConfig>);
    validateUser(email: string, password: string): Promise<{
        id: number;
    }>;
    login(userId: number): Promise<{
        id: number;
        accesToken: string;
        refreshToken: string;
    }>;
    generateTokens(userId: number): Promise<{
        accesToken: string;
        refreshToken: string;
    }>;
    refreshToken(userId: number): Promise<{
        id: number;
        accesToken: string;
        refreshToken: string;
    }>;
    validateRefreshToken(userId: number, refreshToken: string): Promise<{
        id: number;
    }>;
    logOut(userId: number): Promise<void>;
    validateJwtUser(userId: number): Promise<CurrentUser>;
    validateGoogleUser(googleUser: CreateUserDto): Promise<import("../users/users.model").User>;
}
