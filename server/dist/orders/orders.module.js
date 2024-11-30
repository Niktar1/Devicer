"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersModule = void 0;
const common_1 = require("@nestjs/common");
const orders_service_1 = require("./orders.service");
const orders_controller_1 = require("./orders.controller");
const orders_model_1 = require("./orders.model");
const sequelize_1 = require("@nestjs/sequelize");
const users_model_1 = require("../users/users.model");
const order_items_model_1 = require("./order-items.model");
const products_model_1 = require("../products/products.model");
const shipping_info_module_1 = require("../shipping-info/shipping-info.module");
const auth_module_1 = require("../auth/auth.module");
const baskets_module_1 = require("../baskets/baskets.module");
const shipping_info_model_1 = require("../shipping-info/shipping-info.model");
let OrdersModule = class OrdersModule {
};
exports.OrdersModule = OrdersModule;
exports.OrdersModule = OrdersModule = __decorate([
    (0, common_1.Module)({
        providers: [orders_service_1.OrdersService],
        controllers: [orders_controller_1.OrdersController],
        imports: [
            sequelize_1.SequelizeModule.forFeature([orders_model_1.Order, order_items_model_1.OrderItem, users_model_1.User, products_model_1.Product, shipping_info_model_1.ShippingInfo]),
            shipping_info_module_1.ShippingInfoModule,
            auth_module_1.AuthModule,
            baskets_module_1.BasketsModule,
        ]
    })
], OrdersModule);
//# sourceMappingURL=orders.module.js.map