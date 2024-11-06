import { Request } from 'express';
export declare class AuthController {
    login(): {
        msg: string;
    };
    logout(): {
        msg: string;
    };
    logGoogle(): {
        msg: string;
    };
    redirect(): {
        msg: string;
    };
    user(request: Request): {
        msg: string;
    };
}
