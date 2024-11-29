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
exports.BasketsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const baskets_model_1 = require("./baskets.model");
const basket_products_1 = require("./basket-products");
let BasketsService = class BasketsService {
    constructor(basketRepository, basketProductsRepo) {
        this.basketRepository = basketRepository;
        this.basketProductsRepo = basketProductsRepo;
    }
    async getUserBasket(anonymousId, userId) {
        if (userId) {
            const userBasket = await this.basketRepository.findOne({ where: { userId: userId } });
            return userBasket;
        }
        if (!userId && anonymousId) {
            console.log(`getUserBasket.AnonymousId: ${anonymousId}`);
            return await this.basketRepository.findOne({ where: { anonymousId: anonymousId } });
        }
        if (!userId && !anonymousId)
            throw new common_1.NotFoundException("No basket Id was provided");
    }
    async createBasket(userId) {
        if (userId) {
            return await this.basketRepository.create({ userId });
        }
        if (!userId)
            console.log("createBasket NO userId");
        return await this.basketRepository.create();
    }
    async addToBasket(productId, basketId) {
        const existingProduct = await this.basketProductsRepo.findOne({ where: { productId: productId, basketId: basketId }, });
        if (!existingProduct) {
            const dto = { basketId, productId };
            return await this.basketProductsRepo.create(dto);
        }
        throw new common_1.ConflictException(`The product with ID ${productId} already exists in the basket.`);
    }
    async removeProduct(productId, basketId) {
        const existingProduct = await this.basketProductsRepo.findOne({ where: { productId: productId }, });
        console.log(':::');
        console.log(existingProduct);
        if (existingProduct) {
            return await this.basketProductsRepo.destroy({ where: { productId: productId, basketId: basketId } });
        }
        throw new common_1.ConflictException(`No product with ID ${productId} in the basket. `);
    }
    async getBasketProducts(basketId) {
        return await this.basketProductsRepo.findAll({ where: { basketId: basketId } });
    }
};
exports.BasketsService = BasketsService;
exports.BasketsService = BasketsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(baskets_model_1.Basket)),
    __param(1, (0, sequelize_1.InjectModel)(basket_products_1.BasketProducts)),
    __metadata("design:paramtypes", [Object, Object])
], BasketsService);
//# sourceMappingURL=baskets.service.js.map