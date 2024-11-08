import { ConfigType } from "@nestjs/config";
import { Strategy } from "passport-jwt";
import { AuthJwtPayload } from "../types/auth-jwtPayload";
import jwtConfig from "../config/jwt.config";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private jwtConfiguration;
    constructor(jwtConfiguration: ConfigType<typeof jwtConfig>);
    validate(payload: AuthJwtPayload): {
        id: number;
    };
}
export {};
