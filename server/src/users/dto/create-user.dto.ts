export class CreateUserDto {
    readonly email: string;
    readonly password: string;
    readonly displayName?: string;
    readonly googleId?: string;
}