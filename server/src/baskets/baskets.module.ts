import { Module } from '@nestjs/common';
import { BasketsService } from './baskets.service';
import { BasketsController } from './baskets.controller';
import { BasketProducts } from './basket-products';
import { Basket } from './baskets.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  providers: [BasketsService],
  controllers: [BasketsController],
  imports: [
    SequelizeModule.forFeature([Basket, BasketProducts]),
    AuthModule,
    ProductsModule
  ],
  exports: [BasketsService]
})
export class BasketsModule { }
