import { IsBoolean, IsNumber, IsString } from "class-validator";

export class AddShippingInfoDto {
    
    @IsString({ message: "Should be a string" })
    readonly zipCode: string;
    
    @IsString({ message: "Should be a string" })
    readonly address: string;
    
    @IsString({ message: "Should be a string" })
    readonly city: string;
    
    @IsString({ message: "Should be a string" })
    readonly country: string;

    @IsString({ message: "Should be a string" })
    readonly state?: string;
    
    @IsBoolean({message: "should be boolean"})
    isDefault?: boolean;
}
