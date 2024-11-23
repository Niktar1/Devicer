import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Product } from "src/products/products.model";
import { User } from "src/users/users.model";

@Table({ tableName: 'ratings' })
export class Rating extends Model<Rating> {

    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number;

    @ForeignKey(() => Product)
    @Column({ type: DataType.INTEGER })
    productId: number;

    @Column({ type: DataType.INTEGER })
    rating: number;

    @Column({ type: DataType.STRING, allowNull: true })
    review: string;

    @BelongsTo(() => User, { onDelete: 'CASCADE' })
    user: User;

    @BelongsTo(() => Product, { onDelete: 'CASCADE' })
    product: Product;
}