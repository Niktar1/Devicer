import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
export declare class UsersService {
    private userRepository;
    private roleService;
    constructor(userRepository: typeof User, roleService: RolesService);
    updateHashedRefreshToken(userId: number, hashedRefreshToken: string): Promise<[affectedCount: number, affectedRows: User[]]>;
    createUser(dto: CreateUserDto): Promise<User>;
    getAllUsers(): Promise<User[]>;
    findByEmail(email: string): Promise<User>;
    findOne(id: number): Promise<User>;
}
