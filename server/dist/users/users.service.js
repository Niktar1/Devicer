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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const users_model_1 = require("./users.model");
const roles_service_1 = require("../roles/roles.service");
const banned_users_model_1 = require("./banned-users.model");
let UsersService = class UsersService {
    constructor(userRepository, roleService, bannedUserRepo) {
        this.userRepository = userRepository;
        this.roleService = roleService;
        this.bannedUserRepo = bannedUserRepo;
    }
    async updateHashedRefreshToken(userId, hashedRefreshToken) {
        return await this.userRepository.update({ hashedRefreshToken }, {
            where: { id: userId },
            returning: true
        });
    }
    async createUser(dto) {
        const existingUser = await this.findByEmail(dto.email);
        if (existingUser)
            throw new common_1.ConflictException('User with that email already exists');
        const user = await this.userRepository.create(dto);
        const role = await this.roleService.getRoleByValue("USER");
        await user.$set('roles', [role.id]);
        return user;
    }
    async deleteUser(userId) {
        return this.userRepository.destroy({ where: { id: userId } });
    }
    async addRole(dto) {
        const user = await this.userRepository.findByPk(dto.userId);
        const role = await this.roleService.getRoleByValue(dto.value);
        if (role && user) {
            await user.$add('roles', role.id);
            return dto;
        }
        throw new common_1.NotFoundException("User or Role not found");
    }
    async ban(dto) {
        const user = await this.userRepository.findByPk(dto.userId);
        if (!user) {
            throw new common_1.NotFoundException("User not found");
        }
        user.banned = true;
        await user.save();
        const bannedUser = await this.bannedUserRepo.create({ user_id: user.id, banReason: dto.banReason });
        return [user, bannedUser];
    }
    async getBannedUsers() {
        const bannedUsers = await this.userRepository.findAll({ include: [banned_users_model_1.BannedUser] });
        console.log("\nnnn");
        console.log(bannedUsers);
        console.log("\n");
    }
    async getAllUsers() {
        const users = await this.userRepository.findAll({ include: { all: true } });
        return users;
    }
    async findByEmail(email) {
        return await this.userRepository.findOne({
            where: {
                email,
            }
        });
    }
    async findOne(id) {
        const user = this.userRepository.findOne({
            where: { id },
            attributes: ['email', 'id', 'hashedRefreshToken'],
            include: { all: true }
        });
        return user;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(users_model_1.User)),
    __param(2, (0, sequelize_1.InjectModel)(banned_users_model_1.BannedUser)),
    __metadata("design:paramtypes", [Object, roles_service_1.RolesService, Object])
], UsersService);
//# sourceMappingURL=users.service.js.map