import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "./users.model";

interface BannedUserCreationAttrs {
    user_id: number;
    banReason: string;
}

@Table({ tableName: 'banned_users' })
export class BannedUser extends Model<BannedUser, BannedUserCreationAttrs> {

    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, unique: true, allowNull: false })
    user_id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    banReason: string;

    @Column({ type: DataType.DATE, allowNull: false, defaultValue: DataType.NOW })
    banDate: Date;

    @BelongsTo(() => User)
    user: User;
}