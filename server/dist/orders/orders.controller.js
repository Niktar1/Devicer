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
exports.OrdersController = void 0;
const common_1 = require("@nestjs/common");
const orders_service_1 = require("./orders.service");
const auth_service_1 = require("../auth/auth.service");
const baskets_service_1 = require("../baskets/baskets.service");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
let OrdersController = class OrdersController {
    constructor(ordersService, authService, basketsService) {
        this.ordersService = ordersService;
        this.authService = authService;
        this.basketsService = basketsService;
    }
    async createOrder(req, { phone, shippingInfoId }) {
        const jwtToken = req.cookies.jwtToken;
        if (jwtToken) {
            const decoded = await this.authService.verifyJwtToken(jwtToken);
            if (decoded.sub) {
                const userBasket = await this.basketsService.getUserBasket(null, decoded.sub);
                const basketProducts = await this.basketsService.getBasketProducts(userBasket.id);
                const orderDto = {
                    userId: decoded.sub,
                    phone: phone,
                    shippingInfoId: shippingInfoId,
                };
                const order = await this.ordersService.createOrder(orderDto);
                basketProducts.forEach((product) => {
                    const orderItemsDto = {
                        orderId: order.id,
                        productId: product.id,
                    };
                    return this.ordersService.addOrderItem(orderItemsDto);
                });
                return [order, basketProducts];
            }
        }
    }
    async getUserOrders(req) {
        const jwtToken = req.cookies.jwtToken;
        if (jwtToken) {
            const decoded = await this.authService.verifyJwtToken(jwtToken);
            if (decoded.sub) {
                return await this.ordersService.getOrdersByUserId(decoded.sub);
            }
        }
        throw new common_1.UnauthorizedException("User not logged in");
    }
    async getAllOrders() {
        return await this.ordersService.getOrdersByUserId();
    }
    async getOrdersByUserId(userId) {
        return await this.ordersService.getOrdersByUserId(userId);
    }
};
exports.OrdersController = OrdersController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "createOrder", null);
__decorate([
    (0, common_1.Get)('myorders'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "getUserOrders", null);
__decorate([
    (0, roles_decorator_1.Roles)("ADMIN"),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "getAllOrders", null);
__decorate([
    (0, roles_decorator_1.Roles)("ADMIN"),
    (0, common_1.Get)(':userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "getOrdersByUserId", null);
exports.OrdersController = OrdersController = __decorate([
    (0, common_1.Controller)('orders'),
    __metadata("design:paramtypes", [orders_service_1.OrdersService,
        auth_service_1.AuthService,
        baskets_service_1.BasketsService])
], OrdersController);
//# sourceMappingURL=orders.controller.js.map