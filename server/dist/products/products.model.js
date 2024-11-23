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
exports.Product = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const product_info_model_1 = require("./product-info.model");
const categories_model_1 = require("../category/categories.model");
const product_categories_model_1 = require("../category/product-categories.model");
const ratings_model_1 = require("../ratings/ratings.model");
let Product = class Product extends sequelize_typescript_1.Model {
};
exports.Product = Product;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true }),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Product.prototype, "price", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Product.prototype, "shortDesc", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Product.prototype, "image", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.ARRAY(sequelize_typescript_1.DataType.STRING) }),
    __metadata("design:type", Array)
], Product.prototype, "images", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], Product.prototype, "countStock", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => product_info_model_1.ProductInfo, { onDelete: 'CASCADE', }),
    __metadata("design:type", product_info_model_1.ProductInfo)
], Product.prototype, "productInfo", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => categories_model_1.Category, () => product_categories_model_1.ProductCategory),
    __metadata("design:type", Array)
], Product.prototype, "categories", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => ratings_model_1.Rating),
    __metadata("design:type", Array)
], Product.prototype, "ratings", void 0);
exports.Product = Product = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'products' })
], Product);
//# sourceMappingURL=products.model.js.map