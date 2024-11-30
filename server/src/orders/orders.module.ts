import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './orders.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { OrderItem } from './order-items.model';
import { Product } from 'src/products/products.model';
import { ShippingInfoModule } from 'src/shipping-info/shipping-info.module';
import { AuthModule } from 'src/auth/auth.module';
import { BasketsModule } from 'src/baskets/baskets.module';
import { ShippingInfo } from 'src/shipping-info/shipping-info.model';

@Module({
  providers: [OrdersService],
  controllers: [OrdersController],
  imports: [
    SequelizeModule.forFeature([Order, OrderItem, User, Product, ShippingInfo]),
    ShippingInfoModule,
    AuthModule,
    BasketsModule,
  ]
})
export class OrdersModule { }
