import { AfterCreate, BeforeCreate, BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { BasketProducts } from "./basket-products";
import { v4 as uuidv4 } from 'uuid';  // Import the uuid library

interface BasketCreationAttrs {
    userId?: number
}

@Table({ tableName: 'baskets' })
export class Basket extends Model<Basket, BasketCreationAttrs> {

    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: true })
    userId: number;

    // Field to store the anonymous ID (UUID)
    @Column({ type: DataType.STRING, allowNull: true })
    anonymousId: string;

    // Hook to set the anonymous ID
    @BeforeCreate
    static generateAnonymousId(basket: Basket) {
        if (!basket.userId) {  // Only generate anonymous ID if no user is logged in
            basket.anonymousId = uuidv4();  // Generate a UUID for anonymous users
        }
    }

    @BelongsTo(() => User, { onDelete: 'CASCADE', })
    users: User;

    @HasMany(() => BasketProducts, { onDelete: 'CASCADE', })
    basketProducts: BasketProducts;
}