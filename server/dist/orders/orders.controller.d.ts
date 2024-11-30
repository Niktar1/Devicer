import { OrdersService } from './orders.service';
import { AuthService } from 'src/auth/auth.service';
import { BasketsService } from 'src/baskets/baskets.service';
export declare class OrdersController {
    private ordersService;
    private authService;
    private basketsService;
    constructor(ordersService: OrdersService, authService: AuthService, basketsService: BasketsService);
    createOrder(req: any, { phone, shippingInfoId }: {
        phone: number;
        shippingInfoId: number;
    }): Promise<(import("./orders.model").Order | import("../baskets/basket-products").BasketProducts[])[]>;
    getUserOrders(req: any): Promise<Promise<{
        order: import("./orders.model").Order;
        orderItems: import("./order-items.model").OrderItem[];
    }>[]>;
    getAllOrders(): Promise<Promise<{
        order: import("./orders.model").Order;
        orderItems: import("./order-items.model").OrderItem[];
    }>[]>;
    getOrdersByUserId(userId: number): Promise<Promise<{
        order: import("./orders.model").Order;
        orderItems: import("./order-items.model").OrderItem[];
    }>[]>;
}
