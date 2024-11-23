import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Product } from './products.model';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { ProductInfo } from './product-info.model';
import { AddInfoDto } from './dto/add-product-info.dto';
import { ProductCategoryDto } from './dto/product-category.dto';
import { CategoriesService } from 'src/category/categories.service';
import { ProductCategory } from 'src/category/product-categories.model';

@Injectable()
export class ProductsService {

    constructor(
        @InjectModel(Product) private productRepository: typeof Product,
        @InjectModel(ProductInfo) private productInfoRepo: typeof ProductInfo,
        @InjectModel(ProductCategory) private productCategoryRepo: typeof ProductCategory,
        private fileService: FilesService,
        private categoryService: CategoriesService,) { }


    async getAll() {
        return await this.productRepository.findAll();
    }

    async getById(productId: number) {
        return await this.productRepository.findByPk(productId);
    }

    async create(dto: CreateProductDto, images: Express.Multer.File[]) {
        try {
            // Create imageNames for all uploaded images
            const imageNames = await Promise.all(images.map((image) => this.fileService.createFile(image)),);
            const primaryImage = imageNames[0];

            const product = await this.productRepository.create({ ...dto, image: primaryImage, images: imageNames })
            const productInfo = await this.productInfoRepo.create({ productId: product.id, description: dto.description, additionalInfo: dto.additionalInfo })

            return [product, productInfo];

        } catch (e) {
            console.error('Error creating product:', e);
            throw new HttpException('Error occurred while creating the product', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    delete(productId: number) {
        return this.productRepository.destroy({where: {id: productId}})
    }

    async addInfo(dto: AddInfoDto, productId: number) {
        // Check if ProductInfo exists for this product
        let productInfo = await this.productInfoRepo.findOne({
            where: { productId },
        });

        productInfo.additionalInfo = { ...productInfo.additionalInfo, ...dto.additionalInfo, }; // Merge existing with new additionalInfo
        await productInfo.save();

        return productInfo;
    }

    async addCategory(dto: ProductCategoryDto) {
        const product = await this.productRepository.findOne({ where: { id: dto.productId } });
        const category = await this.categoryService.getCategoryByValue(dto.value);

        if (category && product) {
            await product.$add('categories', category.id);
            return dto;
        }
    }

    async removeCategory(dto: ProductCategoryDto) {
        const product = await this.productRepository.findOne({ where: { id: dto.productId } });
        const category = await this.categoryService.getCategoryByValue(dto.value);

        if (category && product) {
            await product.$remove('categories', category.id);
            return dto;
        }
    }

    async getProductCategories(productId: number) {
        const productCategories = this.productCategoryRepo.findAll({ where: { productId } })
        return productCategories;
    }
}
