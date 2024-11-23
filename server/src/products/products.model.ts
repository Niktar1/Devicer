import { BelongsToMany, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { ProductInfo } from "./product-info.model";
import { Category } from "src/category/categories.model";
import { ProductCategory } from "src/category/product-categories.model";
import { Rating } from "src/ratings/ratings.model";

interface ProductCreationAttrs {
    name: string;
    price: string;
    shortDesc: string;
    image: string;
    images: string[];
}

@Table({ tableName: 'products' })
export class Product extends Model<Product, ProductCreationAttrs> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING })
    name: string;

    @Column({ type: DataType.STRING })
    price: string;

    @Column({ type: DataType.STRING })
    shortDesc: string;

    @Column({ type: DataType.STRING })
    image: string;

    @Column({ type: DataType.ARRAY(DataType.STRING) }) // Array of image file names
    images: string[];

    @Column({ type: DataType.INTEGER, allowNull: true })
    countStock: number;

    @HasOne(() => ProductInfo, { onDelete: 'CASCADE', })
    productInfo: ProductInfo;

    @BelongsToMany(() => Category, () => ProductCategory)
    categories: Category[];

    @HasMany(() => Rating)
    ratings: Rating[];
}
