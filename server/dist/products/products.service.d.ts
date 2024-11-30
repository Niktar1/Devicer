import { Product } from './products.model';
import { CreateProductDto } from './dto/create-product.dto';
import { FilesService } from 'src/files/files.service';
import { ProductInfo } from './product-info.model';
import { AddInfoDto } from './dto/add-product-info.dto';
import { ProductCategoryDto } from './dto/product-category.dto';
import { CategoriesService } from 'src/category/categories.service';
import { ProductCategory } from 'src/category/product-categories.model';
export declare class ProductsService {
    private productRepository;
    private productInfoRepo;
    private productCategoryRepo;
    private fileService;
    private categoryService;
    constructor(productRepository: typeof Product, productInfoRepo: typeof ProductInfo, productCategoryRepo: typeof ProductCategory, fileService: FilesService, categoryService: CategoriesService);
    getAll(): Promise<Product[]>;
    getById(productId: number): Promise<Product>;
    create(dto: CreateProductDto, images: Express.Multer.File[]): Promise<(Product | ProductInfo)[]>;
    delete(productId: number): Promise<number>;
    addInfo(dto: AddInfoDto, productId: number): Promise<ProductInfo>;
    addCategory(dto: ProductCategoryDto): Promise<ProductCategoryDto>;
    removeCategory(dto: ProductCategoryDto): Promise<ProductCategoryDto>;
    getProductCategories(productId: number): Promise<ProductCategory[]>;
}
