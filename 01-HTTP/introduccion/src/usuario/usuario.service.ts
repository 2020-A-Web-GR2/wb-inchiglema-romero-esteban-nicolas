import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class usuarioService {
    constructor(
        @InjectRepository(UsuarioEntity)
        private repositorio: Repository<UsuarioEntity>
    ) {
    }
    
    crearUno(nuevoUsuario: UsuarioEntity){
        return this.repositorio.create(nuevoUsuario);
    }
}