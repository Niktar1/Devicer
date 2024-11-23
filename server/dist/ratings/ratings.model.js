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
exports.Rating = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const products_model_1 = require("../products/products.model");
const users_model_1 = require("../users/users.model");
let Rating = class Rating extends sequelize_typescript_1.Model {
};
exports.Rating = Rating;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true }),
    __metadata("design:type", Number)
], Rating.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => users_model_1.User),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], Rating.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => products_model_1.Product),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], Rating.prototype, "productId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], Rating.prototype, "rating", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: true }),
    __metadata("design:type", String)
], Rating.prototype, "review", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => users_model_1.User, { onDelete: 'CASCADE' }),
    __metadata("design:type", users_model_1.User)
], Rating.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => products_model_1.Product, { onDelete: 'CASCADE' }),
    __metadata("design:type", products_model_1.Product)
], Rating.prototype, "product", void 0);
exports.Rating = Rating = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'ratings' })
], Rating);
//# sourceMappingURL=ratings.model.js.map