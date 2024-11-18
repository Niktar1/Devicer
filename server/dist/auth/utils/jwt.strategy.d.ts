import { ConfigType } from "@nestjs/config";
import { Strategy } from "passport-jwt";
import { AuthJwtPayload } from "../types/auth-jwtPayload";
import jwtConfig from "../config/jwt.config";
import { AuthService } from "../auth.service";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private jwtConfiguration;
    private authService;
    constructor(jwtConfiguration: ConfigType<typeof jwtConfig>, authService: AuthService);
    validate(payload: AuthJwtPayload): Promise<import("../types/current-user").CurrentUser>;
}
export {};
