"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const users_service_1 = require("../users/users.service");
const local_strategy_1 = require("./utils/local.strategy");
const sequelize_1 = require("@nestjs/sequelize");
const users_model_1 = require("../users/users.model");
const roles_module_1 = require("../roles/roles.module");
const jwt_1 = require("@nestjs/jwt");
const jwt_config_1 = require("./config/jwt.config");
const config_1 = require("@nestjs/config");
const jwt_strategy_1 = require("./utils/jwt.strategy");
const refresh_jwt_config_1 = require("./config/refresh-jwt.config");
const refresh_strategy_1 = require("./utils/refresh.strategy");
const core_1 = require("@nestjs/core");
const jwt_auth_guard_1 = require("./guards/jwt-auth/jwt-auth.guard");
const google_oauth_config_1 = require("../config/google.oauth.config");
const roles_guard_1 = require("./guards/roles/roles.guard");
const google_strategy_1 = require("./utils/google.strategy");
const banned_users_model_1 = require("../users/banned-users.model");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forFeature([users_model_1.User, banned_users_model_1.BannedUser]),
            jwt_1.JwtModule.registerAsync(jwt_config_1.default.asProvider()),
            config_1.ConfigModule.forFeature(jwt_config_1.default),
            config_1.ConfigModule.forFeature(refresh_jwt_config_1.default),
            config_1.ConfigModule.forFeature(google_oauth_config_1.default),
            roles_module_1.RolesModule,
            banned_users_model_1.BannedUser,
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            users_service_1.UsersService,
            local_strategy_1.LocalStrategy,
            jwt_strategy_1.JwtStrategy,
            refresh_strategy_1.RefreshJwtStrategy,
            google_strategy_1.GoogleStrategy,
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_auth_guard_1.JwtAuthGuard
            },
            {
                provide: core_1.APP_GUARD,
                useClass: roles_guard_1.RolesGuard
            },
        ],
        exports: [auth_service_1.AuthService]
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map