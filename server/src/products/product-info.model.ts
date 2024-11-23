import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Product } from "./products.model";

interface ProductInfoCreationAttrs {
    productId: number;
    description: string;
    additionalInfo?: Record<string, string>
}

@Table({ tableName: 'product_info' })
export class ProductInfo extends Model<ProductInfo, ProductInfoCreationAttrs> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ForeignKey(() => Product)
    @Column({ type: DataType.INTEGER, unique: true, allowNull: false })
    productId: number

    @Column({ type: DataType.STRING })
    description: string;

    @Column(DataType.JSONB)
    additionalInfo: Record<string, string>;

    @BelongsTo(() => Product)
    product: Product;

}