import { Model } from "sequelize-typescript";
import { User } from "../users/users.model";
import { Order } from "src/orders/orders.model";
interface ShippingInfoCreationAttrs {
    userId: number;
    zipCode: string;
    address: string;
    city: string;
    country: string;
    state?: string;
}
export declare class ShippingInfo extends Model<ShippingInfo, ShippingInfoCreationAttrs> {
    id: number;
    userId: number;
    orderId: number;
    zipCode: string;
    address: string;
    city: string;
    state: string;
    country: string;
    isDefault: boolean;
    user: User;
    orders: Order;
}
export {};
