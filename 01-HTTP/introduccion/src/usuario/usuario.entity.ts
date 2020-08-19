import {Column, Entity, Index, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {MascotaEntity} from "../mascota/mascota.entity";

@Index([
    'nombre',
    'apellido',
    'cedula',
    'fechaNacimiento'
    ]
)
@Index(
    [
        'nombre',
        'apellido',
        'cedula'
    ],
    {
        unique: true
    }
)
@Entity('db_usuario')
export class UsuarioEntity {

    @PrimaryGeneratedColumn({
        unsigned: true,
        comment: 'Identificador',
        name: 'id'
    })
    id: number;

    @Column({
        name: 'nombre',
        type: 'varchar',
        nullable: true
    })
    nombre?: string;

    @Column({
        name: 'apellido',
        type: 'varchar',
        nullable: true,
        length: '60'
    })
    apellido?: string;

    @Column({
        name: 'cedula',
        type: 'varchar',
        nullable: false,
        unique: true,
        length: '10'
    })
    cedula: string;

    @Column({
        nullable: true,
        type: "decimal",
        precision: 10,
        scale: 4
    })
    sueldo?:number

    @Column({
        nullable: true,
        type: 'date',
        name: 'fecha_nacimiento'
    })
    fechaNacimiento?: string;

    @Column({
        nullable: true,
        type: 'datetime',
        name: 'fecha_nacimiento_nacimiento'
    })
    fechaHoraNacimiento?: string;

    @OneToMany(
        type => MascotaEntity,
        mascota => mascota.usuario
    )
    mascotas: MascotaEntity[];
}
