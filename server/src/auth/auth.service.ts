import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { AuthJwtPayload } from './types/auth-jwtPayload';
import refreshJwtConfig from './config/refresh-jwt.config';
import { ConfigType } from '@nestjs/config';
import * as argon2 from 'argon2';
import { CurrentUser } from './types/current-user';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService,
        private jwtService: JwtService,
        @Inject(refreshJwtConfig.KEY) private refreshTokenConfig: ConfigType<typeof refreshJwtConfig>
    ) { }

    async validateUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email);
        if (!user) throw new UnauthorizedException("User not found!");

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) throw new UnauthorizedException('Invalid credentials')

        return { id: user.id };
    }

    async login(userId: number) {
        const { accesToken, refreshToken } = await this.generateTokens(userId);
        const hashedRefreshToken = await argon2.hash(refreshToken);
        await this.userService.updateHashedRefreshToken(userId, hashedRefreshToken)
        return ({
            id: userId,
            accesToken,
            refreshToken,
        });
    }

    async generateTokens(userId: number) {
        const payload: AuthJwtPayload = { sub: userId };
        const [accesToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload),
            this.jwtService.signAsync(payload, this.refreshTokenConfig)
        ]);
        return {
            accesToken,
            refreshToken,
        }
    }

    async refreshToken(userId: number) {
        const { accesToken, refreshToken } = await this.generateTokens(userId);
        const hashedRefreshToken = await argon2.hash(refreshToken);
        await this.userService.updateHashedRefreshToken(userId, hashedRefreshToken)
        return ({
            id: userId,
            accesToken,
            refreshToken,
        });
    }

    async validateRefreshToken(userId: number, refreshToken: string) {
        const user = await this.userService.findOne(userId);
        if (!user || !user.hashedRefreshToken) {
            throw new UnauthorizedException("Invalid Refresh Token")
        }

        const refreshTokenMatches = await argon2.verify(user.hashedRefreshToken, refreshToken);
        if (!refreshTokenMatches) {
            throw new UnauthorizedException("Invalid Refresh Token")
        }

        return { id: userId };
    }

    async logOut(userId: number) {
        // here we are setting the refresh token to null = revoking the token so it is unusable
        await this.userService.updateHashedRefreshToken(userId, null)
    }

    async validateJwtUser(userId: number) {
        const user = await this.userService.findOne(userId);

        if (!user) throw new UnauthorizedException("User not found!")
        const userRoles = user.roles.map(role => role.dataValues.value);
        const currentUser: CurrentUser = { id: user.id, role: userRoles };
        return currentUser;
    }

    async validateGoogleUser(googleUser: CreateUserDto) {
        const user = await this.userService.findByEmail(googleUser.email);
        if (user) return user;
        return await this.userService.createUser(googleUser);
    }

    async verifyJwtToken(token: string) {
        try {
            const decoded = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
            console.log("\n DecodedFrom AuthService: \n");
            console.log(decoded);
            console.log();
            return decoded;
        } catch (error) {
            if (error instanceof Error && error.message === 'jwt expired') {
                throw new Error('Token has expired');
            } else {
                throw new Error('Invalid token');
            }
        }
    }
}
