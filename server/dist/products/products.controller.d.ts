import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
export declare class ProductsController {
    private productsService;
    constructor(productsService: ProductsService);
    createProduct(dto: CreateProductDto, files: Express.Multer.File[]): Promise<import("./products.model").Product>;
}
