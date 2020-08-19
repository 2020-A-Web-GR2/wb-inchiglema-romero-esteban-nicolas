import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {MascotaEntity} from "../mascota/mascota.entity";

@Entity()
export class VacunaEntity {
    @PrimaryGeneratedColumn()
    id: Number

    @Column()
    nombre: string

    @ManyToOne(
        type => MascotaEntity,
        mascota => mascota.vacuna
    )
    mascota: MascotaEntity;
}