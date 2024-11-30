import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateOrderDto {
    @IsNumber({}, { message: 'Should be a number' })
    readonly userId: number;

    @IsNumber({}, { message: 'Should be a number' })
    readonly phone: number;

    @IsNumber({}, { message: 'Should be a number' })
    readonly shippingInfoId: number;

}