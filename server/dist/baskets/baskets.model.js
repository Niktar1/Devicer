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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Basket = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const users_model_1 = require("../users/users.model");
const basket_products_1 = require("./basket-products");
const uuid_1 = require("uuid");
let Basket = class Basket extends sequelize_typescript_1.Model {
    static generateAnonymousId(basket) {
        if (!basket.userId) {
            basket.anonymousId = (0, uuid_1.v4)();
        }
    }
};
exports.Basket = Basket;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true }),
    __metadata("design:type", Number)
], Basket.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => users_model_1.User),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], Basket.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: true }),
    __metadata("design:type", String)
], Basket.prototype, "anonymousId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => users_model_1.User, { onDelete: 'CASCADE', }),
    __metadata("design:type", users_model_1.User)
], Basket.prototype, "users", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => basket_products_1.BasketProducts, { onDelete: 'CASCADE', }),
    __metadata("design:type", basket_products_1.BasketProducts)
], Basket.prototype, "basketProducts", void 0);
__decorate([
    sequelize_typescript_1.BeforeCreate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Basket]),
    __metadata("design:returntype", void 0)
], Basket, "generateAnonymousId", null);
exports.Basket = Basket = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'baskets' })
], Basket);
//# sourceMappingURL=baskets.model.js.map