import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto {
    @IsString({ message: 'Name should be a string' })
    readonly name: string;

    @IsString({ message: 'Name should be a string' })
    readonly price: string;

    @IsString({ message: 'Short description should be a string' })
    readonly shortDesc: string;

    @IsArray()
    @IsOptional()
    readonly images: string[]; // Optional field for image file names (array of strings)
}