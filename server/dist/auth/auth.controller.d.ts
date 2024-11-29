import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: any, res: any): Promise<void>;
    googleLogin(): void;
    googleCallback(req: any, res: any): Promise<void>;
    refreshToken(req: any): Promise<{
        id: number;
        accesToken: string;
        refreshToken: string;
    }>;
    logOut(req: any): void;
}
