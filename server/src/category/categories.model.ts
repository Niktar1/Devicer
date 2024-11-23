import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Product } from "src/products/products.model";
import { ProductCategory } from "./product-categories.model";

interface CategoryCreationAttrs {
    value: string;
}

@Table({ tableName: 'categories' })
export class Category extends Model<Category, CategoryCreationAttrs> {

    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING })
    value: string;

    @BelongsToMany(() => Product, () => ProductCategory)
    products: Product[]
}