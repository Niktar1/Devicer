export class CreateUserDto {
    readonly email: string;
    readonly password: string;
    readonly dysplayName?: string;
    readonly googleId?: string;
}