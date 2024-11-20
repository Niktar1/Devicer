import { Model } from "sequelize-typescript";
import { User } from "./users.model";
interface BannedUserCreationAttrs {
    user_id: number;
    banReason: string;
}
export declare class BannedUser extends Model<BannedUser, BannedUserCreationAttrs> {
    id: number;
    user_id: number;
    banReason: string;
    banDate: Date;
    user: User;
}
export {};
