import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {UsuarioCreateDto} from "./DTO/usuario.create-dto";
import {UsuarioUpdateDto} from "./DTO/usuario.update-dto";

@Injectable()
export class usuarioService {
    constructor(
        @InjectRepository(UsuarioEntity)
        private repositorio: Repository<UsuarioEntity>
    ) {
    }

    crearUno(usuario: UsuarioEntity){
        return this.repositorio.save(usuario);
    }

    buscarTodos(){
        return this.repositorio.find();
    }

    buscarUno(id: number){
        return this.repositorio.findOne(id);
    }

    editarUno(usuario: UsuarioEntity){
        return this.repositorio.save(usuario);
    }

    eliminarUno(id: number){
        return this.repositorio.delete(id);
    }

}