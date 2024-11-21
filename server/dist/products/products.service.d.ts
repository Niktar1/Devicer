import { Product } from './products.model';
import { CreateProductDto } from './dto/create-product.dto';
import { FilesService } from 'src/files/files.service';
export declare class ProductsService {
    private productRepository;
    private fileService;
    constructor(productRepository: typeof Product, fileService: FilesService);
    create(dto: CreateProductDto, images: Express.Multer.File[]): Promise<Product>;
}
