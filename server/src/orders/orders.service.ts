import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './orders.model';
import { OrderItem } from './order-items.model';
import { ShippingInfoService } from 'src/shipping-info/shipping-info.service';
import { AddOrderItemsDto } from './dto/add-order-items.dto';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
    constructor(
        @InjectModel(Order) private ordersRepository: typeof Order,
        @InjectModel(OrderItem) private orderItemsRepository: typeof OrderItem,
        private shippingInfoService: ShippingInfoService,
    ) { }

    async createOrder(dto: CreateOrderDto) {
        return await this.ordersRepository.create(dto);
    }

    async addOrderItem(dto: AddOrderItemsDto) {
        return await this.orderItemsRepository.create(dto);
    }

    async getOrderById(orderId) {
        const order = await this.ordersRepository.findByPk(orderId)
        const orderItems = await this.orderItemsRepository.findAll({ where: { orderId: orderId } });
        return [order, orderItems];
    }

    async getInfoById(id: number) {
        return await this.shippingInfoService.getInfoById(id)
    }

    async getOrdersByUserId(userId?: number) {
        if (userId) {
            const allOrders = await this.ordersRepository.findAll({ where: { userId: userId } })
            const orders = allOrders.map(async (order) => {
                const orderItems = await this.orderItemsRepository.findAll({ where: { orderId: order.id } })
                return { order, orderItems }
            })
            return orders;
        }

        if (!userId) {
            const allOrders = await this.ordersRepository.findAll()
            const orders = allOrders.map(async (order) => {
                const orderItems = await this.orderItemsRepository.findAll({ where: { orderId: order.id } })
                return { order, orderItems }
            })
            return orders;
        }
    }
}
