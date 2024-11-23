import { IsObject } from "class-validator";

export class AddInfoDto {
    @IsObject()
    readonly additionalInfo: Record<string, string>;
}