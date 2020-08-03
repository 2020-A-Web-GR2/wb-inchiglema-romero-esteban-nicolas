import {IsAlpha, IsNotEmpty, Length} from "class-validator";

export class NameCreateDto {
    @IsNotEmpty()
    @IsAlpha()
    @Length(1,60)
    name: string;
}