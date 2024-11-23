"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesModule = void 0;
const common_1 = require("@nestjs/common");
const categories_controller_1 = require("./categories.controller");
const categories_service_1 = require("./categories.service");
const categories_model_1 = require("./categories.model");
const product_categories_model_1 = require("./product-categories.model");
const sequelize_1 = require("@nestjs/sequelize");
const products_model_1 = require("../products/products.model");
let CategoriesModule = class CategoriesModule {
};
exports.CategoriesModule = CategoriesModule;
exports.CategoriesModule = CategoriesModule = __decorate([
    (0, common_1.Module)({
        controllers: [categories_controller_1.CategoriesController],
        providers: [categories_service_1.CategoriesService],
        imports: [
            sequelize_1.SequelizeModule.forFeature([categories_model_1.Category, products_model_1.Product, product_categories_model_1.ProductCategory]),
        ],
        exports: [
            categories_service_1.CategoriesService
        ]
    })
], CategoriesModule);
//# sourceMappingURL=categories.module.js.map