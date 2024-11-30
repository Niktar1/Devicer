import { BeforeCreate, BeforeUpdate, BelongsToMany, Column, DataType, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";
import * as bcrypt from 'bcryptjs';
import { BannedUser } from "./banned-users.model";
import { Rating } from "src/ratings/ratings.model";
import { Basket } from "src/baskets/baskets.model";
import { ShippingInfo } from "../shipping-info/shipping-info.model";
import { Order } from "src/orders/orders.model";

interface UserCreationAttrs {
    email: string;
    password?: string;
    googleId?: string;
    displayName?: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, allowNull: true })
    password: string;

    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string;

    @Column({ type: DataType.STRING })
    displayName: string;

    @Column({ type: DataType.STRING, allowNull: true })
    googleId: string;

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    banned: boolean;

    @HasOne(() => BannedUser, { onDelete: 'CASCADE', })
    bannedUsers: BannedUser;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];

    @HasMany(() => Rating)
    ratings: Rating[];

    @HasOne(() => Basket, { onDelete: 'CASCADE', })
    basket: Basket;

    @HasMany(() => ShippingInfo, { onDelete: 'CASCADE', })
    shippingInfo: ShippingInfo[];

    @HasMany(() => Order, { onDelete: 'CASCADE', })
    orders: Order[]

    @BeforeCreate
    @BeforeUpdate
    static async hashPassword(user: User) {
        if (user.password) {
            user.password = await bcrypt.hash(user.password, 10); // 10 is the salt rounds
        }
    }

    @Column({ type: DataType.STRING, allowNull: true })
    hashedRefreshToken: string;
}
