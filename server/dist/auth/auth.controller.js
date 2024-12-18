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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const local_auth_guard_1 = require("./guards/local-auth/local-auth.guard");
const refresh_auth_guard_1 = require("./guards/refresh-auth/refresh-auth.guard");
const jwt_auth_guard_1 = require("./guards/jwt-auth/jwt-auth.guard");
const public_decorator_1 = require("./decorators/public.decorator");
const google_auth_guard_1 = require("./guards/google-auth/google-auth.guard");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(req, res) {
        const response = await this.authService.login(req.user.id);
        res.cookie('jwtAccessToken', response.accesToken, 'jwtRefreshToken', response.refreshToken, { httpOnly: true }).redirect('http://localhost:3001');
    }
    googleLogin() { }
    async googleCallback(req, res) {
        const response = await this.authService.login(req.user.id);
        res.cookie('jwtToken', response.accesToken, { httpOnly: true, maxAge: 3600000 }).redirect('http://localhost:3001');
    }
    refreshToken(req) {
        return this.authService.refreshToken(req.user.id);
    }
    logOut(req) {
        this.authService.logOut(req.user.id);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, public_decorator_1.Public)(),
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Post)("login"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.UseGuards)(google_auth_guard_1.GoogleAuthGuard),
    (0, common_1.Get)("google/login"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "googleLogin", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.UseGuards)(google_auth_guard_1.GoogleAuthGuard),
    (0, common_1.Get)("google/cb"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleCallback", null);
__decorate([
    (0, common_1.UseGuards)(refresh_auth_guard_1.RefreshAuthGuard),
    (0, common_1.Post)("refresh"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)("logout"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logOut", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map