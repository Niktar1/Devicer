import { User } from 'src/users/users.model';
import { UserDetails } from 'src/utils/types';
export declare class AuthService {
    private readonly userRepository;
    constructor(userRepository: typeof User);
    validateUser(details: UserDetails): Promise<User>;
    findUser(id: number): Promise<User>;
}
