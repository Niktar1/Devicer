import { IsString } from "class-validator";

export class CreateCategoryDto {
    @IsString({ message: "should be a string" })
    readonly value: string
}