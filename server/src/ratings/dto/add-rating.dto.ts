import { Optional } from "@nestjs/common";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class AddRatingDto {
    @IsNumber({}, { message: "Should be a number" })
    readonly userId: number;
    @IsNumber({}, { message: "Should be a number" })
    readonly productId: number;
    @IsNumber({}, { message: "Should be a number" })
    readonly rating: number;
    @IsString({ message: "Should be a string" })
    @IsOptional()
    readonly review: string;
}