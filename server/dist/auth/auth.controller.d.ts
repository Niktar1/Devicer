import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
        id: number;
        accesToken: string;
        refreshToken: string;
    }>;
    refreshToken(req: any): Promise<{
        id: number;
        accesToken: string;
        refreshToken: string;
    }>;
    logOut(req: any): void;
}
