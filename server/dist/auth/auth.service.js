"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
const refresh_jwt_config_1 = require("./config/refresh-jwt.config");
const argon2 = require("argon2");
let AuthService = class AuthService {
    constructor(userService, jwtService, refreshTokenConfig) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.refreshTokenConfig = refreshTokenConfig;
    }
    async validateUser(email, password) {
        const user = await this.userService.findByEmail(email);
        if (!user)
            throw new common_1.UnauthorizedException("User not found!");
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch)
            throw new common_1.UnauthorizedException('Invalid credentials');
        return { id: user.id };
    }
    async login(userId) {
        const { accesToken, refreshToken } = await this.generateTokens(userId);
        const hashedRefreshToken = await argon2.hash(refreshToken);
        await this.userService.updateHashedRefreshToken(userId, hashedRefreshToken);
        return ({
            id: userId,
            accesToken,
            refreshToken,
        });
    }
    async generateTokens(userId) {
        const payload = { sub: userId };
        const [accesToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload),
            this.jwtService.signAsync(payload, this.refreshTokenConfig)
        ]);
        return {
            accesToken,
            refreshToken,
        };
    }
    async refreshToken(userId) {
        const { accesToken, refreshToken } = await this.generateTokens(userId);
        const hashedRefreshToken = await argon2.hash(refreshToken);
        await this.userService.updateHashedRefreshToken(userId, hashedRefreshToken);
        return ({
            id: userId,
            accesToken,
            refreshToken,
        });
    }
    async validateRefreshToken(userId, refreshToken) {
        const user = await this.userService.findOne(userId);
        if (!user || !user.hashedRefreshToken) {
            throw new common_1.UnauthorizedException("Invalid Refresh Token");
        }
        const refreshTokenMatches = await argon2.verify(user.hashedRefreshToken, refreshToken);
        if (!refreshTokenMatches) {
            throw new common_1.UnauthorizedException("Invalid Refresh Token");
        }
        return { id: userId };
    }
    async logOut(userId) {
        await this.userService.updateHashedRefreshToken(userId, null);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)(refresh_jwt_config_1.default.KEY)),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService, void 0])
], AuthService);
//# sourceMappingURL=auth.service.js.map