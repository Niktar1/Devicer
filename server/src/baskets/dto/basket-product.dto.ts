import { IsNumber } from "class-validator";

export class BasketProductDto {

    @IsNumber({}, { message: "Should be a number" })
    basketId: number;

    @IsNumber({}, { message: "Should be a number" })
    productId: number;
}