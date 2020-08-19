import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {UsuarioEntity} from "../usuario/usuario.entity";
import {VacunaEntity} from "../vacuna/vacuna.entity";

@Entity()
export class MascotaEntity {
    @PrimaryGeneratedColumn()
    id: Number;

    @Column()
    nombre: string;

    @ManyToOne(
        type => UsuarioEntity,
        usuario => usuario.mascotas
    )
    usuario: UsuarioEntity;

    @OneToMany(
        type => VacunaEntity,
        vacuna => vacuna.mascota
    )
    vacuna: VacunaEntity[];


}