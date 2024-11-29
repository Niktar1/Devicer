import { Model } from "sequelize-typescript";
import { Product } from "src/products/products.model";
import { Basket } from "./baskets.model";
interface BasketProductsCreationAttrs {
    basketId: number;
    productId: number;
}
export declare class BasketProducts extends Model<BasketProducts, BasketProductsCreationAttrs> {
    id: number;
    basketId: number;
    productId: number;
    basket: Basket;
    product: Product;
}
export {};
