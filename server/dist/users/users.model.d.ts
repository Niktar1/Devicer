import { Optional } from "sequelize";
import { Model } from "sequelize-typescript";
import { Role } from "src/roles/roles.model";
interface UserAttrs {
    email: string;
    password: string;
    googleId: number;
    displayName: string;
}
interface UserCreationAttrs extends Optional<UserAttrs, "password" | "googleId" | "displayName"> {
}
export declare class User extends Model<UserAttrs, UserCreationAttrs> {
    id: number;
    displayName: string;
    password: string;
    email: string;
    googleId: string;
    banned: boolean;
    roles: Role[];
}
export {};
