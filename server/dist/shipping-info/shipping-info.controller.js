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
exports.ShippingInfoController = void 0;
const common_1 = require("@nestjs/common");
const shipping_info_service_1 = require("./shipping-info.service");
const add_shippingInfo_dto_1 = require("./dto/add-shippingInfo.dto");
const auth_service_1 = require("../auth/auth.service");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
let ShippingInfoController = class ShippingInfoController {
    constructor(shippingInfoService, authService) {
        this.shippingInfoService = shippingInfoService;
        this.authService = authService;
    }
    async getShippingInfos(req) {
        const jwtToken = req.cookies.jwtToken;
        if (jwtToken) {
            const decoded = await this.authService.verifyJwtToken(jwtToken);
            if (decoded.sub) {
                return await this.shippingInfoService.getInfosByUserId(decoded.sub);
            }
        }
        throw new common_1.BadRequestException("user id not provided");
    }
    async createShippingInfo(req, dto) {
        const jwtToken = req.cookies.jwtToken;
        if (jwtToken) {
            const decoded = await this.authService.verifyJwtToken(jwtToken);
            if (decoded.sub) {
                return await this.shippingInfoService.addShippingInfo(dto, decoded.sub);
            }
        }
        throw new common_1.BadRequestException("user id not provided");
    }
    async removeShippingInfo(req, shippingInfoId) {
        try {
            const jwtToken = req.cookies.jwtToken;
            if (jwtToken) {
                const decoded = await this.authService.verifyJwtToken(jwtToken);
                if (decoded.sub) {
                    return await this.shippingInfoService.removeShippingInfo(shippingInfoId, decoded.sub);
                }
            }
        }
        catch (e) {
            throw new common_1.NotFoundException("Shipping address not found");
        }
    }
    async getInfoById(id) {
        return await this.shippingInfoService.getInfoById(id);
    }
};
exports.ShippingInfoController = ShippingInfoController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ShippingInfoController.prototype, "getShippingInfos", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, add_shippingInfo_dto_1.AddShippingInfoDto]),
    __metadata("design:returntype", Promise)
], ShippingInfoController.prototype, "createShippingInfo", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], ShippingInfoController.prototype, "removeShippingInfo", null);
__decorate([
    (0, roles_decorator_1.Roles)("ADMIN"),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ShippingInfoController.prototype, "getInfoById", null);
exports.ShippingInfoController = ShippingInfoController = __decorate([
    (0, common_1.Controller)('shipping-info'),
    __metadata("design:paramtypes", [shipping_info_service_1.ShippingInfoService,
        auth_service_1.AuthService])
], ShippingInfoController);
//# sourceMappingURL=shipping-info.controller.js.map