import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { Category } from './categories.model';
import { ProductCategory } from './product-categories.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from 'src/products/products.model';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService],
  imports: [
    SequelizeModule.forFeature([Category, Product, ProductCategory]),
  ],
  exports: [
    CategoriesService
  ]
})
export class CategoriesModule { }
