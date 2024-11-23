import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Product } from "src/products/products.model";
import { Category } from "./categories.model";

@Table({ tableName: 'product_categories' })
export class ProductCategory extends Model<ProductCategory> {

    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ForeignKey(() => Product)
    @Column({ type: DataType.INTEGER })
    productId: number;

    @ForeignKey(() => Category)
    @Column({ type: DataType.INTEGER })
    categoryId: number;
}