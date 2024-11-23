import { Model } from "sequelize-typescript";
import { Product } from "src/products/products.model";
import { User } from "src/users/users.model";
export declare class Rating extends Model<Rating> {
    id: number;
    userId: number;
    productId: number;
    rating: number;
    review: string;
    user: User;
    product: Product;
}
