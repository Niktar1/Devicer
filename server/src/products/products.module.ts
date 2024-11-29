import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './products.model';
import { FilesModule } from 'src/files/files.module';
import { ProductInfo } from './product-info.model';
import { Category } from 'src/category/categories.model';
import { ProductCategory } from 'src/category/product-categories.model';
import { CategoriesModule } from 'src/category/categories.module';
import { Rating } from 'src/ratings/ratings.model';
import { BasketProducts } from 'src/baskets/basket-products';

@Module({
  providers: [ProductsService],
  controllers: [ProductsController],
  imports: [
    SequelizeModule.forFeature([Product, ProductInfo, Category, ProductCategory, Rating, BasketProducts]),
    FilesModule,
    CategoriesModule
  ],
  exports: [ProductsService]
})
export class ProductsModule { }
