import { Category } from './categories.model';
import { CreateCategoryDto } from './dto/create-category.dto';
export declare class CategoriesService {
    private categoryRepository;
    constructor(categoryRepository: typeof Category);
    getAll(): Promise<Category[]>;
    getCategoryByValue(value: string): Promise<Category>;
    getCategoryValuesByIds(ids: number[]): Promise<string[]>;
    getCategoryByIds(categoryId: number[]): Promise<Category[]>;
    create(dto: CreateCategoryDto): Promise<Category>;
    delete(value: string): Promise<number>;
}
