import { Model } from "sequelize-typescript";
import { ShippingInfo } from "src/shipping-info/shipping-info.model";
import { User } from "src/users/users.model";
import { OrderItem } from "./order-items.model";
import { OrderStatusEnum } from "./dto/order-status.enum";
interface OrderCreationAttrs {
    userId: number;
    phone: number;
    shippingInfoId: number;
}
export declare class Order extends Model<Order, OrderCreationAttrs> {
    id: number;
    userId: number;
    phone: number;
    shippingInfoId: number;
    orderItems: OrderItem[];
    shippingInfo: ShippingInfo;
    status: OrderStatusEnum;
    orderDate: Date;
    user: User;
}
export {};
