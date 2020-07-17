import {IsInt, IsNotEmpty, NotEquals} from "class-validator";

export class DivisionCreateDto {
    @IsNotEmpty()
    @IsInt()
    n1:number;

    @IsNotEmpty()
    @IsInt()
    @NotEquals(0)
    n2:number;
}