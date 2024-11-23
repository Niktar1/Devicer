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
exports.RatingsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const ratings_model_1 = require("./ratings.model");
const products_service_1 = require("../products/products.service");
const users_service_1 = require("../users/users.service");
let RatingsService = class RatingsService {
    constructor(ratingsRepository, productService, userService) {
        this.ratingsRepository = ratingsRepository;
        this.productService = productService;
        this.userService = userService;
    }
    async addRating(dto) {
        const user = await this.userService.findOne(dto.userId);
        const product = await this.productService.getById(dto.productId);
        if (!user)
            throw new common_1.NotFoundException("User not found");
        if (!product)
            throw new common_1.NotFoundException("Product not found");
        const existingRating = await this.ratingsRepository.findOne({ where: { userId: dto.userId, productId: dto.productId } });
        if (existingRating) {
            existingRating.rating = dto.rating;
            existingRating.review = dto.review || null;
            await existingRating.save();
            return existingRating;
        }
        return await this.ratingsRepository.create(dto);
    }
    async getProductRatings(productId) {
        return await this.ratingsRepository.findAll({ where: { productId } });
    }
    async getUserRatings(userId) {
        return await this.ratingsRepository.findAll({ where: { userId } });
    }
};
exports.RatingsService = RatingsService;
exports.RatingsService = RatingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(ratings_model_1.Rating)),
    __metadata("design:paramtypes", [Object, products_service_1.ProductsService,
        users_service_1.UsersService])
], RatingsService);
//# sourceMappingURL=ratings.service.js.map