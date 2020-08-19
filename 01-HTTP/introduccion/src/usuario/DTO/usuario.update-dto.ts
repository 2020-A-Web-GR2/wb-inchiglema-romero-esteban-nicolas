import {
    IsAlpha, IsDateString,
    IsDecimal, IsEmpty, IsInstance, IsInt,
    IsNotEmpty, IsNumber,
    IsNumberString,
    IsOptional,
    IsPositive,
    Length,
    MaxLength
} from "class-validator";
import {MascotaEntity} from "../../mascota/mascota.entity";

export class UsuarioUpdateDto{
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    id:number;

    @IsOptional()
    @IsAlpha()
    @MaxLength(60)
    nombre?:string;

    @IsOptional()
    @IsAlpha()
    @MaxLength(60)
    apellido?:string;

    @IsEmpty()
    cedula?:string;

    @IsOptional()
    //@IsDecimal({ decimal_digits: '10,4' })
    @IsNumber()
    @IsPositive()
    sueldo?:number;

    @IsOptional()
    @IsDateString()
    fechaNacimiento?:string;

    @IsOptional()
    @IsDateString()
    fechaHoraNacimiento?:string;

    @IsOptional()
    @IsInstance(MascotaEntity)
    mascotas?: MascotaEntity[];
}