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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const products_model_1 = require("./products.model");
const sequelize_1 = require("@nestjs/sequelize");
const files_service_1 = require("../files/files.service");
const product_info_model_1 = require("./product-info.model");
const categories_service_1 = require("../category/categories.service");
const product_categories_model_1 = require("../category/product-categories.model");
let ProductsService = class ProductsService {
    constructor(productRepository, productInfoRepo, productCategoryRepo, fileService, categoryService) {
        this.productRepository = productRepository;
        this.productInfoRepo = productInfoRepo;
        this.productCategoryRepo = productCategoryRepo;
        this.fileService = fileService;
        this.categoryService = categoryService;
    }
    async getAll() {
        return await this.productRepository.findAll();
    }
    async getById(productId) {
        return await this.productRepository.findByPk(productId);
    }
    async create(dto, images) {
        try {
            const imageNames = await Promise.all(images.map((image) => this.fileService.createFile(image)));
            const primaryImage = imageNames[0];
            const product = await this.productRepository.create({ ...dto, image: primaryImage, images: imageNames });
            const productInfo = await this.productInfoRepo.create({ productId: product.id, description: dto.description, additionalInfo: dto.additionalInfo });
            return [product, productInfo];
        }
        catch (e) {
            console.error('Error creating product:', e);
            throw new common_1.HttpException('Error occurred while creating the product', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    delete(productId) {
        return this.productRepository.destroy({ where: { id: productId } });
    }
    async addInfo(dto, productId) {
        let productInfo = await this.productInfoRepo.findOne({
            where: { productId },
        });
        productInfo.additionalInfo = { ...productInfo.additionalInfo, ...dto.additionalInfo, };
        await productInfo.save();
        return productInfo;
    }
    async addCategory(dto) {
        const product = await this.productRepository.findOne({ where: { id: dto.productId } });
        const category = await this.categoryService.getCategoryByValue(dto.value);
        if (category && product) {
            await product.$add('categories', category.id);
            return dto;
        }
    }
    async removeCategory(dto) {
        const product = await this.productRepository.findOne({ where: { id: dto.productId } });
        const category = await this.categoryService.getCategoryByValue(dto.value);
        if (category && product) {
            await product.$remove('categories', category.id);
            return dto;
        }
    }
    async getProductCategories(productId) {
        const productCategories = this.productCategoryRepo.findAll({ where: { productId } });
        return productCategories;
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(products_model_1.Product)),
    __param(1, (0, sequelize_1.InjectModel)(product_info_model_1.ProductInfo)),
    __param(2, (0, sequelize_1.InjectModel)(product_categories_model_1.ProductCategory)),
    __metadata("design:paramtypes", [Object, Object, Object, files_service_1.FilesService,
        categories_service_1.CategoriesService])
], ProductsService);
//# sourceMappingURL=products.service.js.map