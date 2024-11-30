"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingInfoModule = void 0;
const common_1 = require("@nestjs/common");
const shipping_info_service_1 = require("./shipping-info.service");
const shipping_info_controller_1 = require("./shipping-info.controller");
const sequelize_1 = require("@nestjs/sequelize");
const auth_module_1 = require("../auth/auth.module");
const shipping_info_model_1 = require("./shipping-info.model");
let ShippingInfoModule = class ShippingInfoModule {
};
exports.ShippingInfoModule = ShippingInfoModule;
exports.ShippingInfoModule = ShippingInfoModule = __decorate([
    (0, common_1.Module)({
        providers: [shipping_info_service_1.ShippingInfoService],
        controllers: [shipping_info_controller_1.ShippingInfoController],
        imports: [
            sequelize_1.SequelizeModule.forFeature([shipping_info_model_1.ShippingInfo]),
            auth_module_1.AuthModule,
        ],
        exports: [shipping_info_service_1.ShippingInfoService]
    })
], ShippingInfoModule);
//# sourceMappingURL=shipping-info.module.js.map