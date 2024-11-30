import { BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { ShippingInfo } from "src/shipping-info/shipping-info.model";
import { User } from "src/users/users.model";
import { OrderItem } from "./order-items.model";
import { OrderStatusEnum } from "./dto/order-status.enum";

interface OrderCreationAttrs {
    userId: number;
    phone: number;
    shippingInfoId: number;
}

@Table({ tableName: 'orders' })
export class Order extends Model<Order, OrderCreationAttrs> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number;

    @Column({ type: DataType.INTEGER })
    phone: number;

    @ForeignKey(() => ShippingInfo)
    @Column({ type: DataType.INTEGER })
    shippingInfoId: number;

    @HasMany(() => OrderItem)
    orderItems: OrderItem[];

    @HasOne(() => ShippingInfo)
    shippingInfo: ShippingInfo;

    @Column({ type: DataType.ENUM, values: Object.values(OrderStatusEnum), defaultValue: OrderStatusEnum.CONFIRMED })
    status: OrderStatusEnum;

    // @Column({ type: DataType.INTEGER })
    // totalPrice: number;

    @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
    orderDate: Date;

    @BelongsTo(() => User)
    user: User;

}
