import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AddInfoDto } from './dto/add-product-info.dto';
import { ProductCategoryDto } from './dto/product-category.dto';
import { CategoriesService } from 'src/category/categories.service';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('products')
export class ProductsController {
    constructor(
        private productsService: ProductsService,
        private categoriesService: CategoriesService) { }

    @Public()
    @Get()
    getAllProducts() {
        return this.productsService.getAll();
    }

    @Get(':id')
    async getProduct(@Param('id') productId: number) {
        const product = await this.productsService.getById(productId);
        const productCategories = await this.productsService.getProductCategories(productId)
        const categoriesIds = productCategories.map(item => item.dataValues.categoryId);
        const categoriesValues = await this.categoriesService.getCategoryValuesByIds(categoriesIds);

        return [product, { "productCategories": categoriesValues }];
    }

    @Roles("ADMIN")
    @Post()
    @UseInterceptors(FilesInterceptor('images'))
    async createProduct(@Body() dto: CreateProductDto, @UploadedFiles() files: Express.Multer.File[]) {
        const product = await this.productsService.create(dto, files); // Pass the array of files to the service
        return product;
    }

    @Roles("ADMIN")
    @Delete(':id')
    deleteProduct(@Param('id') productId: number) {
        return this.productsService.delete(productId)
    }

    @Roles("ADMIN")
    @Patch(':id/info')
    addInfo(@Body() dto: AddInfoDto, @Param('id') productId: number) {
        return this.productsService.addInfo(dto, productId);
    }

    @Roles("ADMIN")
    @Post('categories')
    addCategoriesToProduct(@Body() dto: ProductCategoryDto) {
        return this.productsService.addCategory(dto);
    }

    @Roles("ADMIN")
    @Delete('categories')
    removeCategory(@Body() dto: ProductCategoryDto) {
        return this.productsService.removeCategory(dto);
    }
}
