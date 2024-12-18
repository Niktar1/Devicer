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
exports.User = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const roles_model_1 = require("../roles/roles.model");
const user_roles_model_1 = require("../roles/user-roles.model");
const bcrypt = require("bcryptjs");
const banned_users_model_1 = require("./banned-users.model");
const ratings_model_1 = require("../ratings/ratings.model");
const baskets_model_1 = require("../baskets/baskets.model");
const shipping_info_model_1 = require("../shipping-info/shipping-info.model");
const orders_model_1 = require("../orders/orders.model");
let User = class User extends sequelize_typescript_1.Model {
    static async hashPassword(user) {
        if (user.password) {
            user.password = await bcrypt.hash(user.password, 10);
        }
    }
};
exports.User = User;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true }),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, unique: true, allowNull: false }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], User.prototype, "displayName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: true }),
    __metadata("design:type", String)
], User.prototype, "googleId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, defaultValue: false }),
    __metadata("design:type", Boolean)
], User.prototype, "banned", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => banned_users_model_1.BannedUser, { onDelete: 'CASCADE', }),
    __metadata("design:type", banned_users_model_1.BannedUser)
], User.prototype, "bannedUsers", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => roles_model_1.Role, () => user_roles_model_1.UserRoles),
    __metadata("design:type", Array)
], User.prototype, "roles", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => ratings_model_1.Rating),
    __metadata("design:type", Array)
], User.prototype, "ratings", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => baskets_model_1.Basket, { onDelete: 'CASCADE', }),
    __metadata("design:type", baskets_model_1.Basket)
], User.prototype, "basket", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => shipping_info_model_1.ShippingInfo, { onDelete: 'CASCADE', }),
    __metadata("design:type", Array)
], User.prototype, "shippingInfo", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => orders_model_1.Order, { onDelete: 'CASCADE', }),
    __metadata("design:type", Array)
], User.prototype, "orders", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: true }),
    __metadata("design:type", String)
], User.prototype, "hashedRefreshToken", void 0);
__decorate([
    sequelize_typescript_1.BeforeCreate,
    sequelize_typescript_1.BeforeUpdate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User]),
    __metadata("design:returntype", Promise)
], User, "hashPassword", null);
exports.User = User = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'users' })
], User);
//# sourceMappingURL=users.model.js.map