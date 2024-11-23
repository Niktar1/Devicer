import { Model } from "sequelize-typescript";
import { Product } from "src/products/products.model";
interface CategoryCreationAttrs {
    value: string;
}
export declare class Category extends Model<Category, CategoryCreationAttrs> {
    id: number;
    value: string;
    products: Product[];
}
export {};
