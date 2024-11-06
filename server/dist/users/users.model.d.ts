import { Model } from "sequelize-typescript";
import { Role } from "src/roles/roles.model";
interface UserCreationAttrs {
    email: string;
    password?: string;
    googleId?: string;
    displayName?: string;
}
export declare class User extends Model<User, UserCreationAttrs> {
    id: number;
    password: string;
    email: string;
    displayName: string;
    googleId: string;
    banned: boolean;
    roles: Role[];
}
export {};
