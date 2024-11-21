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
let ProductsService = class ProductsService {
    constructor(productRepository, fileService) {
        this.productRepository = productRepository;
        this.fileService = fileService;
    }
    async create(dto, images) {
        try {
            const imageNames = await Promise.all(images.map((image) => this.fileService.createFile(image)));
            const primaryImage = imageNames[0];
            const product = await this.productRepository.create({ ...dto, image: primaryImage, images: imageNames });
            return product;
        }
        catch (e) {
            console.error('Error creating product:', e);
            throw new common_1.HttpException('Error occurred while creating the product', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(products_model_1.Product)),
    __metadata("design:paramtypes", [Object, files_service_1.FilesService])
], ProductsService);
//# sourceMappingURL=products.service.js.map