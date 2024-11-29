import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Product } from "src/products/products.model";
import { Basket } from "./baskets.model";

interface BasketProductsCreationAttrs {
    basketId: number;
    productId: number;
}

@Table({ tableName: 'basket_prodcuts' })
export class BasketProducts extends Model<BasketProducts, BasketProductsCreationAttrs> {

    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ForeignKey(() => Basket)
    @Column({ type: DataType.INTEGER })
    basketId: number;

    @ForeignKey(() => Product)
    @Column({ type: DataType.INTEGER, unique: true })
    productId: number;

    @BelongsTo(() => Basket, { onDelete: 'CASCADE', })
    basket: Basket;

    @BelongsTo(() => Product, { onDelete: 'CASCADE', })
    product: Product;
}