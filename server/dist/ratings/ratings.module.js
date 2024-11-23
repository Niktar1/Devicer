"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingsModule = void 0;
const common_1 = require("@nestjs/common");
const ratings_service_1 = require("./ratings.service");
const ratings_controller_1 = require("./ratings.controller");
const sequelize_1 = require("@nestjs/sequelize");
const products_model_1 = require("../products/products.model");
const users_model_1 = require("../users/users.model");
const ratings_model_1 = require("./ratings.model");
const users_module_1 = require("../users/users.module");
const products_module_1 = require("../products/products.module");
let RatingsModule = class RatingsModule {
};
exports.RatingsModule = RatingsModule;
exports.RatingsModule = RatingsModule = __decorate([
    (0, common_1.Module)({
        providers: [ratings_service_1.RatingsService],
        controllers: [ratings_controller_1.RatingsController],
        imports: [
            sequelize_1.SequelizeModule.forFeature([ratings_model_1.Rating, users_model_1.User, products_model_1.Product]),
            products_module_1.ProductsModule,
            users_module_1.UsersModule,
        ]
    })
], RatingsModule);
//# sourceMappingURL=ratings.module.js.map