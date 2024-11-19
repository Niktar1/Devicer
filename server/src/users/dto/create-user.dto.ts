import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
    @IsString({ message: 'Should be a string' })
    @IsEmail({}, { message: 'Incorrect email' })
    readonly email: string;
    @IsString({ message: 'Should be a string' })
    @Length(4, 16, { message: 'password has to be 4 to 16 characters long' })
    readonly password: string;
    readonly displayName?: string;
    readonly googleId?: string;
}