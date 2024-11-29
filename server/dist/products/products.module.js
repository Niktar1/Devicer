"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsModule = void 0;
const common_1 = require("@nestjs/common");
const products_service_1 = require("./products.service");
const products_controller_1 = require("./products.controller");
const sequelize_1 = require("@nestjs/sequelize");
const products_model_1 = require("./products.model");
const files_module_1 = require("../files/files.module");
const product_info_model_1 = require("./product-info.model");
const categories_model_1 = require("../category/categories.model");
const product_categories_model_1 = require("../category/product-categories.model");
const categories_module_1 = require("../category/categories.module");
const ratings_model_1 = require("../ratings/ratings.model");
const basket_products_1 = require("../baskets/basket-products");
let ProductsModule = class ProductsModule {
};
exports.ProductsModule = ProductsModule;
exports.ProductsModule = ProductsModule = __decorate([
    (0, common_1.Module)({
        providers: [products_service_1.ProductsService],
        controllers: [products_controller_1.ProductsController],
        imports: [
            sequelize_1.SequelizeModule.forFeature([products_model_1.Product, product_info_model_1.ProductInfo, categories_model_1.Category, product_categories_model_1.ProductCategory, ratings_model_1.Rating, basket_products_1.BasketProducts]),
            files_module_1.FilesModule,
            categories_module_1.CategoriesModule
        ],
        exports: [products_service_1.ProductsService]
    })
], ProductsModule);
//# sourceMappingURL=products.module.js.map