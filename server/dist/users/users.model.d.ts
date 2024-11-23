import { Model } from "sequelize-typescript";
import { Role } from "src/roles/roles.model";
import { BannedUser } from "./banned-users.model";
import { Rating } from "src/ratings/ratings.model";
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
    bannedUsers: BannedUser;
    roles: Role[];
    ratings: Rating[];
    static hashPassword(user: User): Promise<void>;
    hashedRefreshToken: string;
}
export {};
