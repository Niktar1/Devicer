import { IsNumber } from "class-validator";

export class AddOrderItemsDto {
    @IsNumber({}, { message: 'Should be a number' })
    readonly orderId: number;
    
    @IsNumber({}, { message: 'Should be a number' })
    readonly productId: number;
    
    // @IsNumber({}, { message: 'Should be a number' })
    // readonly quantity: number;
}