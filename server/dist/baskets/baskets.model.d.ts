import { Model } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { BasketProducts } from "./basket-products";
interface BasketCreationAttrs {
    userId?: number;
}
export declare class Basket extends Model<Basket, BasketCreationAttrs> {
    id: number;
    userId: number;
    anonymousId: string;
    static generateAnonymousId(basket: Basket): void;
    users: User;
    basketProducts: BasketProducts;
}
export {};
