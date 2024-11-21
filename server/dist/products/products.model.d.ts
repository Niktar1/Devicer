import { Model } from "sequelize-typescript";
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
}
export {};
