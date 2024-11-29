import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { AddInfoDto } from './dto/add-product-info.dto';
import { ProductCategoryDto } from './dto/product-category.dto';
import { CategoriesService } from 'src/category/categories.service';
export declare class ProductsController {
    private productsService;
    private categoriesService;
    constructor(productsService: ProductsService, categoriesService: CategoriesService);
    getAllProducts(): Promise<import("./products.model").Product[]>;
    getProduct(productId: number): Promise<(import("./products.model").Product | {
        productCategories: string[];
    })[]>;
    createProduct(dto: CreateProductDto, files: Express.Multer.File[]): Promise<(import("./product-info.model").ProductInfo | import("./products.model").Product)[]>;
    deleteProduct(productId: number): Promise<number>;
    addInfo(dto: AddInfoDto, productId: number): Promise<import("./product-info.model").ProductInfo>;
    addCategoriesToProduct(dto: ProductCategoryDto): Promise<ProductCategoryDto>;
    removeCategory(dto: ProductCategoryDto): Promise<ProductCategoryDto>;
}
