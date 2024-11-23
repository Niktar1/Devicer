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
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const products_service_1 = require("./products.service");
const create_product_dto_1 = require("./dto/create-product.dto");
const platform_express_1 = require("@nestjs/platform-express");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const add_product_info_dto_1 = require("./dto/add-product-info.dto");
const product_category_dto_1 = require("./dto/product-category.dto");
const categories_service_1 = require("../category/categories.service");
let ProductsController = class ProductsController {
    constructor(productsService, categoriesService) {
        this.productsService = productsService;
        this.categoriesService = categoriesService;
    }
    getAllProducts() {
        return this.productsService.getAll();
    }
    async getProduct(productId) {
        const product = await this.productsService.getById(productId);
        const productCategories = await this.productsService.getProductCategories(productId);
        const categoriesIds = productCategories.map(item => item.dataValues.categoryId);
        const categoriesValues = await this.categoriesService.getCategoryValuesByIds(categoriesIds);
        return [product, { "productCategories": categoriesValues }];
    }
    async createProduct(dto, files) {
        const product = await this.productsService.create(dto, files);
        return product;
    }
    deleteProduct(productId) {
        return this.productsService.delete(productId);
    }
    addInfo(dto, productId) {
        return this.productsService.addInfo(dto, productId);
    }
    addCategoriesToProduct(dto) {
        return this.productsService.addCategory(dto);
    }
    removeCategory(dto) {
        return this.productsService.removeCategory(dto);
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "getAllProducts", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getProduct", null);
__decorate([
    (0, roles_decorator_1.Roles)("ADMIN"),
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto, Array]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "createProduct", null);
__decorate([
    (0, roles_decorator_1.Roles)("ADMIN"),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "deleteProduct", null);
__decorate([
    (0, roles_decorator_1.Roles)("ADMIN"),
    (0, common_1.Patch)(':id/info'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_product_info_dto_1.AddInfoDto, Number]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "addInfo", null);
__decorate([
    (0, roles_decorator_1.Roles)("ADMIN"),
    (0, common_1.Post)('categories'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_category_dto_1.ProductCategoryDto]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "addCategoriesToProduct", null);
__decorate([
    (0, roles_decorator_1.Roles)("ADMIN"),
    (0, common_1.Delete)('categories'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_category_dto_1.ProductCategoryDto]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "removeCategory", null);
exports.ProductsController = ProductsController = __decorate([
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [products_service_1.ProductsService,
        categories_service_1.CategoriesService])
], ProductsController);
//# sourceMappingURL=products.controller.js.map