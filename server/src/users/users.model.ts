import { Optional } from "sequelize";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";

interface UserAttrs {
    email: string;
    password: string;
    googleId: number;
    displayName: string
}

interface UserCreationAttrs extends Optional<UserAttrs, "password" | "googleId" | "displayName"> {}

@Table({tableName: 'users'})
export class User extends Model<UserAttrs, UserCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING})
    displayName: string;

    @Column({type: DataType.STRING, allowNull: true})
    password: string;
    
    @Column({type: DataType.STRING, unique: true, allowNull: true})
    email: string;

    @Column({type: DataType.INTEGER, allowNull: true})
    googleId: string;

    @Column({type: DataType.BOOLEAN, defaultValue: false})
    banned: boolean;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];
}
 