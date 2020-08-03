import {IsInt, IsNotEmpty, IsPositive} from "class-validator";

export class NumerosCreateDto {
    @IsNotEmpty()
    @IsInt()
    n1:number;

    @IsNotEmpty()
    @IsInt()
    n2:number;
}