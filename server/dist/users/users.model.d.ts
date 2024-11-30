import { Model } from "sequelize-typescript";
import { Role } from "src/roles/roles.model";
import { BannedUser } from "./banned-users.model";
import { Rating } from "src/ratings/ratings.model";
import { Basket } from "src/baskets/baskets.model";
import { ShippingInfo } from "../shipping-info/shipping-info.model";
import { Order } from "src/orders/orders.model";
interface UserCreationAttrs {
    email: string;
    password?: string;
    googleId?: string;
    displayName?: string;
}
export declare class User extends Model<User, UserCreationAttrs> {
    id: number;
    password: string;
    email: string;
    displayName: string;
    googleId: string;
    banned: boolean;
    bannedUsers: BannedUser;
    roles: Role[];
    ratings: Rating[];
    basket: Basket;
    shippingInfo: ShippingInfo[];
    orders: Order[];
    static hashPassword(user: User): Promise<void>;
    hashedRefreshToken: string;
}
export {};
