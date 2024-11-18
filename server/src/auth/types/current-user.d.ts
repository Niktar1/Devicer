import { Role } from "src/roles/roles.model";

export type CurrentUser = {
    id: number;
    role: string[];
}