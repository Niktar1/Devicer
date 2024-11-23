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
exports.RatingsController = void 0;
const common_1 = require("@nestjs/common");
const ratings_service_1 = require("./ratings.service");
const add_rating_dto_1 = require("./dto/add-rating.dto");
const public_decorator_1 = require("../auth/decorators/public.decorator");
let RatingsController = class RatingsController {
    constructor(ratingsService) {
        this.ratingsService = ratingsService;
    }
    async getProductRatings(productId) {
        const ProductRatings = await this.ratingsService.getProductRatings(productId);
        let totalRatings = 0;
        let numberOfRatings = 0;
        ProductRatings.forEach(item => {
            totalRatings += item.dataValues.rating;
            numberOfRatings++;
        });
        let averageRating = numberOfRatings > 0 ? totalRatings / numberOfRatings : 0;
        return { averageRating };
    }
    async getProductReview(productId) {
        return await this.ratingsService.getProductRatings(productId);
    }
    async getUserRatings(userId) {
        return await this.ratingsService.getUserRatings(userId);
    }
    addRating(dto) {
        return this.ratingsService.addRating(dto);
    }
};
exports.RatingsController = RatingsController;
__decorate([
    (0, common_1.Get)('product-ratings/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RatingsController.prototype, "getProductRatings", null);
__decorate([
    (0, common_1.Get)('product-reviews/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RatingsController.prototype, "getProductReview", null);
__decorate([
    (0, common_1.Get)('user-ratings/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RatingsController.prototype, "getUserRatings", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_rating_dto_1.AddRatingDto]),
    __metadata("design:returntype", void 0)
], RatingsController.prototype, "addRating", null);
exports.RatingsController = RatingsController = __decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Controller)('ratings'),
    __metadata("design:paramtypes", [ratings_service_1.RatingsService])
], RatingsController);
//# sourceMappingURL=ratings.controller.js.map