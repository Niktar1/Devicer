import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoriesService } from './categories.service';
export declare class CategoriesController {
    private categoriesService;
    constructor(categoriesService: CategoriesService);
    getAll(): Promise<import("./categories.model").Category[]>;
    getByValue(value: string): Promise<import("./categories.model").Category>;
    create(dto: CreateCategoryDto): Promise<import("./categories.model").Category>;
    delete(value: string): Promise<number>;
}
