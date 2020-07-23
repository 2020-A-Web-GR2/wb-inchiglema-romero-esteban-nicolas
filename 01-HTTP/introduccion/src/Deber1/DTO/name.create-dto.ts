import {IsAlpha, IsNotEmpty, Length} from "class-validator";

export class NameCreateDto {
    @IsNotEmpty()
    @IsAlpha()
    @Length(3,60)
    name: string;
}