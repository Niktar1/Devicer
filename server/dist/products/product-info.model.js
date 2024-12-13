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
exports.ProductInfo = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const products_model_1 = require("./products.model");
let ProductInfo = class ProductInfo extends sequelize_typescript_1.Model {
};
exports.ProductInfo = ProductInfo;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true }),
    __metadata("design:type", Number)
], ProductInfo.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => products_model_1.Product),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, unique: true, allowNull: false }),
    __metadata("design:type", Number)
], ProductInfo.prototype, "productId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], ProductInfo.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.JSONB),
    __metadata("design:type", Object)
], ProductInfo.prototype, "additionalInfo", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => products_model_1.Product),
    __metadata("design:type", products_model_1.Product)
], ProductInfo.prototype, "product", void 0);
exports.ProductInfo = ProductInfo = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'product_info' })
], ProductInfo);
//# sourceMappingURL=product-info.model.js.map