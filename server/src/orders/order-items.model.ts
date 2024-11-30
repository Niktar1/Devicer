import { BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { Order } from "./orders.model";
import { Product } from "src/products/products.model";

interface OrderItemCreationAttrs {

}

@Table({ tableName: 'orders_items' })
export class OrderItem extends Model<OrderItem, OrderItemCreationAttrs> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ForeignKey(() => Order)
    @Column({ type: DataType.INTEGER })
    orderId: number;

    @ForeignKey(() => Product)
    @Column({ type: DataType.INTEGER })
    productId: number;

    // @Column({ type: DataType.INTEGER })
    // quantity: number;

    @BelongsTo(() => Order)
    order: Order;

    @BelongsTo(() => Product)
    product: Product;
}
