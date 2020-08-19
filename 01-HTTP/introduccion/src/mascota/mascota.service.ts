import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {MascotaEntity} from "./mascota.entity";
import {Repository} from "typeorm";
import {UsuarioEntity} from "../usuario/usuario.entity";

@Injectable()
export class MascotaService{
    constructor(
        @InjectRepository(MascotaEntity)
        private repositorio: Repository<MascotaEntity>
    ) {
    }

    crearUnoMascota(nuevaMascota: MascotaEntity){
        return this.repositorio.save(nuevaMascota);
    }

    buscarTodosMascota(){
        return this.repositorio.find();
    }

    buscarUnoMascota(id: number){
        return this.repositorio.findOne(id);
    }

    editarUnoMascota(mascota: MascotaEntity){
        return this.repositorio.save(mascota);
    }

    eliminarUnoMascota(id: number){
        return this.repositorio.delete(id);
    }
}