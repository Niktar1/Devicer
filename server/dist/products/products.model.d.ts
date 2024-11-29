import { Model } from "sequelize-typescript";
import { ProductInfo } from "./product-info.model";
import { Category } from "src/category/categories.model";
import { Rating } from "src/ratings/ratings.model";
import { BasketProducts } from "src/baskets/basket-products";
interface ProductCreationAttrs {
    name: string;
    price: string;
    shortDesc: string;
    image: string;
    images: string[];
}
export declare class Product extends Model<Product, ProductCreationAttrs> {
    id: number;
    name: string;
    price: string;
    shortDesc: string;
    image: string;
    images: string[];
    countStock: number;
    productInfo: ProductInfo;
    categories: Category[];
    ratings: Rating[];
    basketProduct: BasketProducts;
}
export {};
