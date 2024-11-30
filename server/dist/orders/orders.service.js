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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const orders_model_1 = require("./orders.model");
const order_items_model_1 = require("./order-items.model");
const shipping_info_service_1 = require("../shipping-info/shipping-info.service");
let OrdersService = class OrdersService {
    constructor(ordersRepository, orderItemsRepository, shippingInfoService) {
        this.ordersRepository = ordersRepository;
        this.orderItemsRepository = orderItemsRepository;
        this.shippingInfoService = shippingInfoService;
    }
    async createOrder(dto) {
        return await this.ordersRepository.create(dto);
    }
    async addOrderItem(dto) {
        return await this.orderItemsRepository.create(dto);
    }
    async getOrderById(orderId) {
        const order = await this.ordersRepository.findByPk(orderId);
        const orderItems = await this.orderItemsRepository.findAll({ where: { orderId: orderId } });
        return [order, orderItems];
    }
    async getInfoById(id) {
        return await this.shippingInfoService.getInfoById(id);
    }
    async getOrdersByUserId(userId) {
        if (userId) {
            const allOrders = await this.ordersRepository.findAll({ where: { userId: userId } });
            const orders = allOrders.map(async (order) => {
                const orderItems = await this.orderItemsRepository.findAll({ where: { orderId: order.id } });
                return { order, orderItems };
            });
            return orders;
        }
        if (!userId) {
            const allOrders = await this.ordersRepository.findAll();
            const orders = allOrders.map(async (order) => {
                const orderItems = await this.orderItemsRepository.findAll({ where: { orderId: order.id } });
                return { order, orderItems };
            });
            return orders;
        }
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(orders_model_1.Order)),
    __param(1, (0, sequelize_1.InjectModel)(order_items_model_1.OrderItem)),
    __metadata("design:paramtypes", [Object, Object, shipping_info_service_1.ShippingInfoService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map