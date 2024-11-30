import { Model } from "sequelize-typescript";
import { Order } from "./orders.model";
import { Product } from "src/products/products.model";
interface OrderItemCreationAttrs {
}
export declare class OrderItem extends Model<OrderItem, OrderItemCreationAttrs> {
    id: number;
    orderId: number;
    productId: number;
    order: Order;
    product: Product;
}
export {};
