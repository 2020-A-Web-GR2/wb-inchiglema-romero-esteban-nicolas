import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException, NotFoundException,
    Param,
    Post,
    Put
} from "@nestjs/common";
import {usuarioService} from "./usuario.service";
import {UsuarioCreateDto} from "./DTO/usuario.create-dto";
import {validate, ValidationError} from "class-validator";
import {UsuarioUpdateDto} from "./DTO/usuario.update-dto";

@Controller('/usuario')
export class usuarioController {

    arrayUsers = [
        {
            "id": 1,
            "nombre": "Nicolas"
        },
        {
            "id": 2,
            "nombre": "Esteban"
        },
        {
            "id": 3,
            "nombre": "Alejandro"
        },
    ]
    idActual = 3;

    constructor(
        private readonly _UsuarioService: usuarioService
    ) {

    }

    @Get()
    async mostrarTodos(){
        let respuesta
        try{
            respuesta = await this._UsuarioService.buscarTodos();
        }catch (e) {
            console.error(e)
            throw new InternalServerErrorException({
                mensaje: 'Error del servidor'
            });
        }
        if (respuesta) {
            return respuesta;
        } else {
            throw new NotFoundException({
                mensaje: "No existen registros"
            })
        }

        //return this.arrayUsers;
    }

    @Post()
    async crearUno(
        @Body() parametrosCuerpo
    ){
        //DEBER
        //VALIDACION CON DTO USUARIO VALIDATOR
        const usuario = new UsuarioCreateDto();
        usuario.id = parametrosCuerpo.id;
        usuario.nombre = parametrosCuerpo.nombre;
        usuario.apellido = parametrosCuerpo.apellido;
        usuario.cedula = parametrosCuerpo.cedula;
        usuario.sueldo = parametrosCuerpo.sueldo;
        usuario.fechaNacimiento = parametrosCuerpo.fechaNacimiento;
        usuario.fechaHoraNacimiento = parametrosCuerpo.fechaHoraNacimiento;
        usuario.mascotas = parametrosCuerpo.mascotas;
        try{
            const errores: ValidationError[] = await validate(usuario);
            var mensaje = '';
            if (errores.length > 0) {
                console.error('Error', errores);
                throw new BadRequestException({
                    mensaje: 'Error validando datos'
                });
            } else {
                const respuesta = await this._UsuarioService.crearUno(parametrosCuerpo);
                return respuesta
            }
        }catch (e) {
            console.error(e)
            throw new BadRequestException( {
                mensaje: 'Error validando datos'
            });
        }

        // this.idActual += 1;
        // const nuevoUsuario = {
        //     id: this.idActual,
        //     nombre: parametrosCuerpo.nombre
        // };
        // this.arrayUsers.push(nuevoUsuario);
        // return nuevoUsuario;
    }

    @Get(':id')
    async mostrarUno(
        @Param() parametrosRuta
    ){
        let respuesta
        try{
            respuesta = await this._UsuarioService.buscarUno(Number(parametrosRuta.id));
        }catch (e) {
            console.error(e)
            throw new InternalServerErrorException({
                mensaje: 'Error del servidor'
            });
        }
        if (respuesta) {
            return respuesta;
        } else {
            throw new NotFoundException({
                mensaje: "No existen registros"
            })
        }

        // const indice = this.arrayUsers.findIndex(
        //     (usuario) => usuario.id === Number(parametrosRuta.id)
        // )
        // return this.arrayUsers[indice];
    }

    @Put(':id')
    async editarUno(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo
    ){
        const usuario = new UsuarioUpdateDto();
        usuario.id = parametrosCuerpo.id;
        usuario.nombre = parametrosCuerpo.nombre;
        usuario.apellido = parametrosCuerpo.apellido;
        usuario.cedula = parametrosCuerpo.cedula;
        usuario.sueldo = parametrosCuerpo.sueldo;
        usuario.fechaNacimiento = parametrosCuerpo.fechaNacimiento;
        usuario.fechaHoraNacimiento = parametrosCuerpo.fechaHoraNacimiento;
        usuario.mascotas = parametrosCuerpo.mascotas;

        const id = Number(parametrosRuta.id);
        const usuarioEditado = parametrosCuerpo;
        usuarioEditado.id = id;
        try{
            //DEBER
            //VALIDACION CON DTO USUARIO VALIDATOR
            const errores: ValidationError[] = await validate(usuario);
            var mensaje = '';
            if (errores.length > 0) {
                console.error('Error', errores);
                throw new BadRequestException({
                    mensaje: 'Error validando datos'
                });
            } else {
                const respuesta = await this._UsuarioService.editarUno(parametrosCuerpo);
                return respuesta
            }
        }catch (e) {
            console.error(e)
            throw new BadRequestException( {
                mensaje: 'Error actualizando datos'
            });
        }
        // const indice = this.arrayUsers.findIndex(
        //     (usuario) => usuario.id === Number(parametrosRuta.id)
        // )
        // this.arrayUsers[indice].nombre = parametrosCuerpo.nombre;
        // return this.arrayUsers[indice];
    }

    @Delete(':id')
    async eliminarUno(
        @Param() parametrosRuta
    ){
        const id = Number(parametrosRuta.id);
        try{
            const respuesta = await this._UsuarioService.eliminarUno(id);
            return {
                mensaje: 'Registro con id ' + id + ' eliminado.'
            }
        }catch (e) {
            console.error(e)
            throw new InternalServerErrorException( {
                mensaje: 'Error en el servidor'
            });
        }
        // const indice = this.arrayUsers.findIndex(
        //     (usuario) => usuario.id === Number(parametrosRuta.id)
        // )
        // this.arrayUsers.splice(indice,1);
        // return this.arrayUsers;
    }

    //RESTful - Usuario
    //Ver Todos
    //GET http://127.0.0.1:3000/usuario
    //Ver uno
    //GET http://127.0.0.1:3000/usuario/1
    //Crear uno
    //POST http://127.0.0.1:3000/usuario
    //Editar uno
    //PUT http://127.0.0.1:3000/usuario/1
    //Eliminar uno
    //DELETE http://127.0.0.1:3000/usuario/1

    //RESTful - Mascota
    //Ver Todos
    //GET http://127.0.0.1:3000/mascota
    //Ver uno
    //GET http://127.0.0.1:3000/mascota/1
    //Crear uno
    //POST http://127.0.0.1:3000/mascota
    //Editar uno
    //PUT http://127.0.0.1:3000/mascota/1
    //Eliminar uno
    //DELETE http://127.0.0.1:3000/mascota/1

}