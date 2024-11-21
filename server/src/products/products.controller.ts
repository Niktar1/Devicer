import { Body, Controller, Get, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) { }

    @Roles("ADMIN")
    @Post()
    @UseInterceptors(FilesInterceptor('images'))
    async createProduct(@Body() dto: CreateProductDto, @UploadedFiles() files: Express.Multer.File[]) {
        // files is an array of uploaded files
        const product = await this.productsService.create(dto, files); // Pass the array of files to the service
        return product;
    }
}
