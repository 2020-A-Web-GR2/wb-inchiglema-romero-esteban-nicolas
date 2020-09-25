import {Injectable} from "@nestjs/common";
import {FindManyOptions, Like, Repository} from "typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {InjectRepository} from "@nestjs/typeorm";

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

    buscarTodos(textoDeConsulta?:String){
        if (textoDeConsulta !== undefined) {
            const consulta: FindManyOptions<UsuarioEntity> = {
                where: [
                    {
                        nombre: Like(`%${textoDeConsulta}%`)
                    },
                    {
                        apellido: Like(`%${textoDeConsulta}%`)
                    },
                    {
                        cedula: Like(`%${textoDeConsulta}%`)
                    }
                ]
            }
            return this.repositorio.find(consulta);
        } else{
            return this.repositorio.find();
        }
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