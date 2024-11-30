import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../users/users.model";
import { Order } from "src/orders/orders.model";

interface ShippingInfoCreationAttrs {
    userId: number;
    zipCode: string;
    address: string;
    city: string;
    country: string;
    state?: string;
}

@Table({ tableName: 'user-shippingInfo' })
export class ShippingInfo extends Model<ShippingInfo, ShippingInfoCreationAttrs> {

    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number;
    
    @ForeignKey(() => Order)
    @Column({ type: DataType.INTEGER })
    orderId: number;

    @Column({ type: DataType.STRING })
    zipCode: string;

    @Column({ type: DataType.STRING })
    address: string;

    @Column({ type: DataType.STRING })
    city: string;

    @Column({ type: DataType.STRING, allowNull: true })
    state: string;

    @Column({ type: DataType.STRING })
    country: string;

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    isDefault: boolean;

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Order)
    orders: Order;

}