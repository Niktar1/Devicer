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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const categories_model_1 = require("./categories.model");
let CategoriesService = class CategoriesService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    getAll() {
        return this.categoryRepository.findAll();
    }
    async getCategoryByValue(value) {
        return await this.categoryRepository.findOne({ where: { value } });
    }
    async getCategoryValuesByIds(ids) {
        const categories = await this.categoryRepository.findAll({
            where: { id: ids },
        });
        return categories.map(category => category.dataValues.value);
    }
    async getCategoryByIds(categoryId) {
        return await this.categoryRepository.findAll({ where: { id: categoryId } });
    }
    async create(dto) {
        const category = await this.getCategoryByValue(dto.value);
        if (category)
            throw new common_1.ConflictException('Category already exists');
        return this.categoryRepository.create(dto);
    }
    delete(value) {
        return this.categoryRepository.destroy({ where: { value } });
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(categories_model_1.Category)),
    __metadata("design:paramtypes", [Object])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map