import { Order } from './orders.model';
import { OrderItem } from './order-items.model';
import { ShippingInfoService } from 'src/shipping-info/shipping-info.service';
import { AddOrderItemsDto } from './dto/add-order-items.dto';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrdersService {
    private ordersRepository;
    private orderItemsRepository;
    private shippingInfoService;
    constructor(ordersRepository: typeof Order, orderItemsRepository: typeof OrderItem, shippingInfoService: ShippingInfoService);
    createOrder(dto: CreateOrderDto): Promise<Order>;
    addOrderItem(dto: AddOrderItemsDto): Promise<OrderItem>;
    getOrderById(orderId: any): Promise<(Order | OrderItem[])[]>;
    getInfoById(id: number): Promise<import("../shipping-info/shipping-info.model").ShippingInfo>;
    getOrdersByUserId(userId?: number): Promise<Promise<{
        order: Order;
        orderItems: OrderItem[];
    }>[]>;
}
