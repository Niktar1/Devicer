import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Product } from './products.model';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class ProductsService {

    constructor(
        @InjectModel(Product) private productRepository: typeof Product,
        private fileService: FilesService,) { }


    async create(dto: CreateProductDto, images: Express.Multer.File[]) {
        try {
            // Create imageNames for all uploaded images
            const imageNames = await Promise.all(images.map((image) => this.fileService.createFile(image)),);
            const primaryImage = imageNames[0];

            const product = await this.productRepository.create({ ...dto, image: primaryImage, images: imageNames })
            return product;

        } catch (e) {
            console.error('Error creating product:', e);
            throw new HttpException('Error occurred while creating the product', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
