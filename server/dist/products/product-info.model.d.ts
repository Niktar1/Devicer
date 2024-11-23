import { Model } from "sequelize-typescript";
import { Product } from "./products.model";
interface ProductInfoCreationAttrs {
    productId: number;
    description: string;
    additionalInfo?: Record<string, string>;
}
export declare class ProductInfo extends Model<ProductInfo, ProductInfoCreationAttrs> {
    id: number;
    productId: number;
    description: string;
    additionalInfo: Record<string, string>;
    product: Product;
}
export {};
