import { Model } from "sequelize-typescript";
export declare class ProductCategory extends Model<ProductCategory> {
    id: number;
    productId: number;
    categoryId: number;
}
