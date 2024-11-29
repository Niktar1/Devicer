"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const config_1 = require("@nestjs/config");
const users_model_1 = require("./users/users.model");
const users_module_1 = require("./users/users.module");
const roles_module_1 = require("./roles/roles.module");
const roles_model_1 = require("./roles/roles.model");
const user_roles_model_1 = require("./roles/user-roles.model");
const passport_1 = require("@nestjs/passport");
const auth_module_1 = require("./auth/auth.module");
const banned_users_model_1 = require("./users/banned-users.model");
const products_module_1 = require("./products/products.module");
const files_module_1 = require("./files/files.module");
const products_model_1 = require("./products/products.model");
const serve_static_1 = require("@nestjs/serve-static");
const path = require("path");
const product_info_model_1 = require("./products/product-info.model");
const categories_module_1 = require("./category/categories.module");
const categories_model_1 = require("./category/categories.model");
const product_categories_model_1 = require("./category/product-categories.model");
const ratings_module_1 = require("./ratings/ratings.module");
const ratings_model_1 = require("./ratings/ratings.model");
const baskets_module_1 = require("./baskets/baskets.module");
const baskets_model_1 = require("./baskets/baskets.model");
const basket_products_1 = require("./baskets/basket-products");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: `.${process.env.NODE_ENV}.env`
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: path.resolve(__dirname, 'static'),
            }),
            sequelize_1.SequelizeModule.forRoot({
                dialect: 'postgres',
                host: process.env.POSTGRES_HOST,
                port: Number(process.env.POSTGRES_PORT),
                username: process.env.POSTGRES_USER,
                password: process.env.POSTGRES_PASSWORD,
                database: process.env.POSTGRES_DB,
                models: [
                    users_model_1.User,
                    roles_model_1.Role,
                    user_roles_model_1.UserRoles,
                    banned_users_model_1.BannedUser,
                    products_model_1.Product,
                    product_info_model_1.ProductInfo,
                    categories_model_1.Category,
                    product_categories_model_1.ProductCategory,
                    ratings_model_1.Rating,
                    baskets_model_1.Basket,
                    basket_products_1.BasketProducts,
                ],
                autoLoadModels: true
            }),
            passport_1.PassportModule.register({ session: true }),
            users_module_1.UsersModule,
            roles_module_1.RolesModule,
            auth_module_1.AuthModule,
            products_module_1.ProductsModule,
            files_module_1.FilesModule,
            categories_module_1.CategoriesModule,
            ratings_module_1.RatingsModule,
            baskets_module_1.BasketsModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map