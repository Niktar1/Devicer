import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-google-oauth20";
const keys = require('../../config/keys')

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
 constructor() {
  super({
    clientID: keys.google.clientID ,
    clientSecret: keys.google.clientSecret,
    callbackURL: 'http://localhost:5000/auth/google/redirect',
    scope: ['profile', 'email'],
  });
 }

 async validate(accessToken: string, refreshToken: string, profile: Profile) {
  console.log(profile)
 }
}