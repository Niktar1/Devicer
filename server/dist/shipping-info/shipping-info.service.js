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
exports.ShippingInfoService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const shipping_info_model_1 = require("./shipping-info.model");
let ShippingInfoService = class ShippingInfoService {
    constructor(shippingInfoRepo) {
        this.shippingInfoRepo = shippingInfoRepo;
    }
    async getInfosByUserId(userId) {
        if (userId) {
            return await this.shippingInfoRepo.findAll({ where: { userId: userId } });
        }
        throw new common_1.BadRequestException("user id not provided");
    }
    async getInfoById(id) {
        return await this.shippingInfoRepo.findByPk(id);
    }
    async addShippingInfo(dto, userId) {
        const isFirstAddress = await this.getInfosByUserId(userId);
        const ShippingInfoDto = { ...dto, userId };
        if (userId) {
            if (isFirstAddress.length > 1) {
                return await this.shippingInfoRepo.create(ShippingInfoDto);
            }
            if (isFirstAddress.length < 1) {
                const ShippingInfoDto = { isDefault: true, ...dto, userId };
                return await this.shippingInfoRepo.create(ShippingInfoDto);
            }
        }
        throw new common_1.BadRequestException("user id not provided");
    }
    async removeShippingInfo(userId, ShippingInfoId) {
        return await this.shippingInfoRepo.destroy({ where: { userId: userId, id: ShippingInfoId } });
    }
};
exports.ShippingInfoService = ShippingInfoService;
exports.ShippingInfoService = ShippingInfoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(shipping_info_model_1.ShippingInfo)),
    __metadata("design:paramtypes", [Object])
], ShippingInfoService);
//# sourceMappingURL=shipping-info.service.js.map