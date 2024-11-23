import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './categories.model';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
    constructor(@InjectModel(Category) private categoryRepository: typeof Category) { }

    getAll() {
        return this.categoryRepository.findAll();
    }

    async getCategoryByValue(value: string) {
        return await this.categoryRepository.findOne({ where: { value } });
    }

    async getCategoryValuesByIds(ids: number[]) {
        const categories = await this.categoryRepository.findAll({
            where: { id: ids },
        });

        return categories.map(category => category.dataValues.value);
    }

    async getCategoryByIds(categoryId: number[]) {
        return await this.categoryRepository.findAll({ where: { id: categoryId } });
    }

    async create(dto: CreateCategoryDto) {
        const category = await this.getCategoryByValue(dto.value);

        if (category) throw new ConflictException('Category already exists')

        return this.categoryRepository.create(dto)
    }

    delete(value: string) {
        return this.categoryRepository.destroy({ where: { value } })
    }
}
