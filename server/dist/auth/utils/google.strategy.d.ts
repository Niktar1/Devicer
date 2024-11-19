import { ConfigType } from "@nestjs/config";
import { Strategy } from "passport-google-oauth20";
import { VerifiedCallback } from "passport-jwt";
import googleOauthConfig from "src/config/google.oauth.config";
import { AuthService } from "../auth.service";
declare const GoogleStrategy_base: new (...args: any[]) => Strategy;
export declare class GoogleStrategy extends GoogleStrategy_base {
    private googleConfiguration;
    private authService;
    constructor(googleConfiguration: ConfigType<typeof googleOauthConfig>, authService: AuthService);
    validate(accessToken: string, refreshToken: string, profile: any, done: VerifiedCallback): Promise<void>;
}
export {};
