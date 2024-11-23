import { IsNumber, IsString } from "class-validator";

export class ProductCategoryDto {
    @IsString({ message: "Should be a string" })
    readonly value: string;
    
    @IsNumber({},{message:"Should be a number"})
    readonly productId: number;
}