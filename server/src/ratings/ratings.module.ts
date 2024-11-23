import { Module } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { RatingsController } from './ratings.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from 'src/products/products.model';
import { User } from 'src/users/users.model';
import { Rating } from './ratings.model';
import { UsersModule } from 'src/users/users.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  providers: [RatingsService],
  controllers: [RatingsController],
  imports: [
    SequelizeModule.forFeature([Rating, User, Product]),
    ProductsModule,
    UsersModule,
  ]
})
export class RatingsModule { }
