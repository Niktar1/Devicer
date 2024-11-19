import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    create(userDto: CreateUserDto): Promise<import("./users.model").User>;
    getProfile(req: any): Promise<import("./users.model").User>;
    getAll(): Promise<import("./users.model").User[]>;
    deleteUser(userId: number): Promise<number>;
    addRole(dto: AddRoleDto): Promise<AddRoleDto>;
    ban(dto: BanUserDto): Promise<import("./users.model").User>;
}
