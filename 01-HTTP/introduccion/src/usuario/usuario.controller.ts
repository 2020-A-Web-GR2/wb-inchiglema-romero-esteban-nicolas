import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException, NotFoundException,
    Param,
    Post,
    Put, Query, Res
} from "@nestjs/common";
import {usuarioService} from "./usuario.service";
import {UsuarioCreateDto} from "./DTO/usuario.create-dto";
import {validate, ValidationError} from "class-validator";
import {UsuarioUpdateDto} from "./DTO/usuario.update-dto";
import {MascotaService} from "../mascota/mascota.service";
import {tryCatch} from "rxjs/internal-compatibility";
import {UsuarioEntity} from "./usuario.entity";

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
        private readonly _UsuarioService: usuarioService,
        private readonly _mascotaService: MascotaService
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
    }

    @Post('crearUsuarioYCrearMascota')
    async crearUsuarioYMascota(
        @Body() parametrosCuerpo
    ){
        const usuario = parametrosCuerpo.usuario;
        const mascota = parametrosCuerpo.mascota
        // Validar Usuario
        // Valodar Mascota
        // -> CREAMOS LOS DOS
        let usuarioCreado;
        try {
            usuarioCreado = await this._UsuarioService.crearUno(usuario);
        } catch (e) {
            console.error(e);
            throw new InternalServerErrorException({
                mensaje: 'Error creando usuario',
            })
        }
        if (usuarioCreado) {
            mascota.usuario = usuarioCreado.id;
            let mascotaCreada;
            try {
                mascotaCreada = await this._mascotaService.crearUnoMascota(mascota);
            } catch (e) {
                console.error(e);
                throw new InternalServerErrorException({
                    mensaje: 'Error creando mascota',
                })
            }
            if (mascotaCreada) {
                return {
                    mascota: mascotaCreada,
                    usuario: usuarioCreado
                }
            } else {
                throw new InternalServerErrorException({
                    mensaje: 'Error creando mascota',
                })
            }
        } else {
            throw new InternalServerErrorException({
                mensaje: 'Error creando mascota',
            })
        }
    }

    @Get('vista/usuario')
    vistaUsuario(
        @Res() res
    ){
        const nombreControlador = 'Nicolas';
        res.render(
            'ejemplo', //nombre de la vista (archivo)
            {   //parametros de la vista
                nombre: nombreControlador,
            }
        )
    }

    @Get('vista/faq')
    vistaFAQ(
        @Res() res
    ){
        const nombreControlador = 'FAQ';
        res.render(
            'usuario/faq',
            {
                nombre: nombreControlador,
            }
        )
    }

    @Get('vista/inicio')
    async vistaInicio(
        @Res() res,
        @Query() parametrosConsulta
    ){
        let resultadoEncontrado
        try {
            resultadoEncontrado = await this._UsuarioService.buscarTodos(parametrosConsulta.busqueda);
        } catch (error) {
            throw new InternalServerErrorException('Error encontrando usuarios')
        }
        if (resultadoEncontrado) {
            res.render(
                'usuario/inicio',
                {
                    arregloUsuarios: resultadoEncontrado,
                    parametrosConsulta: parametrosConsulta
                });
        } else {
            throw new NotFoundException('No se encontraron usuarios')
        }
    }

    @Get('vista/login')
    vistaLogin(
        @Res() res
    ){
        const nombreControlador = 'Login';
        res.render(
            'usuario/login',
            {
                nombre: nombreControlador,
            }
        )
    }

    @Get('vista/crear')
    vistaCrear(
        @Res() res,
        @Query() parametrosConsulta
    ){
        const nombreControlador = 'CrearUsuario';
        res.render(
            'usuario/crear',
            {
                error: parametrosConsulta.error,
                nombre: parametrosConsulta.nombre,
                apellido: parametrosConsulta.apellido,
                cedula: parametrosConsulta.cedula,

            }
        )
    }

    @Post('/crearDesdeVista')
    async crearDesdeVista(
        @Body() parametrosCuerpo,
        @Res() res
    ) {
        let usuario = new UsuarioCreateDto();
        usuario.nombre = parametrosCuerpo.nombre;
        usuario.apellido = parametrosCuerpo.apellido;
        usuario.cedula = parametrosCuerpo.cedula;
        usuario.sueldo = parametrosCuerpo.sueldo;
        usuario.fechaNacimiento = parametrosCuerpo.fechaNacimiento;
        usuario.fechaHoraNacimiento = parametrosCuerpo.fechaHoraNacimiento;
        usuario.mascotas = parametrosCuerpo.mascotas;
        let nombreApellidoConsulta = `&nombre=${parametrosCuerpo.nombre}&apellido=${parametrosCuerpo.apellido}`
        let cedulaConsulta = `&cedula=${parametrosCuerpo.cedula}`
        let errores: ValidationError[]
        try{
            errores = await validate(usuario);
            var mensaje = '';
        }catch (e) {
            console.error(e)
            return res.redirect('/usuario/vista/crear?error=Error validadndo datos' + nombreApellidoConsulta);
        }

        if (errores.length > 0) {
            console.error('Error', errores);
            return res.redirect('/usuario/vista/crear?error=Error en los datos' + nombreApellidoConsulta);
        }else{
            let respuestaCreacionUsuario
            try{
                respuestaCreacionUsuario = await this._UsuarioService.crearUno(parametrosCuerpo)
            } catch (error) {
                console.log(error);
                return res.redirect('/usuario/vista/crear?error=Error creando usuario' + nombreApellidoConsulta + cedulaConsulta);
            }
            if(respuestaCreacionUsuario){
                return res.redirect('/usuario/vista/inicio')
            } else {
                return res.redirect('/usuario/vista/crear?error=Error creando usuario' + nombreApellidoConsulta + cedulaConsulta);
            }
        }
    }

    @Post('eliminarDesdeVista/:id')
    async eliminarDesdeVista(
        @Param() parametrosRuta,
        @Res() res
    ) {
        try {
            const id = Number(parametrosRuta.id);
            await this._UsuarioService.eliminarUno(id)
            return res.redirect('/usuario/vista/inicio?mensaje=Usuario eliminado')
        } catch (error) {
            console.log(error);
            return res.redirect('/usuario/vista/inicio?error=Error eliminando usuario')
        }

    }

    @Get('vista/editar/:id')
    async vistaEditar(
        @Res() res,
        @Query() parametrosConsulta,
        @Param() parametrosRuta
    ){
        const id = Number(parametrosRuta.id);
        let usuarioEncontrado;
        try {
            usuarioEncontrado = await this._UsuarioService.buscarUno(id)
        } catch (e) {
            console.error('Error del servidor')
            return res.redirect('/usuario/vista/inicio?mensaje=Error busacando usuario')
        }
        if(usuarioEncontrado) {
            return res.render(
                'usuario/crear',
                {
                    error: parametrosConsulta.error,
                    usuario: usuarioEncontrado
                }
            )
        }else{
            return res.redirect('/usuario/vista/inicio?mensaje=Usuario no encontrado')
        }
    }

    @Post('/editarDesdeVista/:id')
    async editarDesdeVista(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo,
        @Res() res,
    ) {
        const usuarioEditado = {
            id: Number(parametrosRuta.id),
            nombre: parametrosCuerpo.nombre,
            apellido: parametrosCuerpo.apellido,
            // cedula: parametrosCuerpo.cedula,
        } as UsuarioEntity;
        try {
            await this._UsuarioService.editarUno(usuarioEditado);
            return res.redirect('/usuario/vista/inicio?mensaje=Usuario editado');
        }catch (error) {
            console.error(error);
            return res.redirect('/usuario/vista/inicio?mensaje=Error editando usuario');
        }
        // let usuarioEditado = new UsuarioEntity();
        // usuarioEditado.id = parametrosRuta.id.toInt()
        // usuarioEditado.nombre = parametrosCuerpo.nombre;
        // usuarioEditado.apellido = parametrosCuerpo.apellido;
        // usuarioEditado.cedula = parametrosCuerpo.cedula;
        // usuarioEditado.sueldo = parametrosCuerpo.sueldo;
        // usuarioEditado.fechaNacimiento = parametrosCuerpo.fechaNacimiento;
        // usuarioEditado.fechaHoraNacimiento = parametrosCuerpo.fechaHoraNacimiento;
        // usuarioEditado.mascotas = parametrosCuerpo.mascotas;
        // let usuario:UsuarioUpdateDto = usuarioEditado
        // let nombreApellidoConsulta = `&nombre=${parametrosCuerpo.nombre}&apellido=${parametrosCuerpo.apellido}`
        // let cedulaConsulta = `&cedula=${parametrosCuerpo.cedula}`
        // let errores: ValidationError[]
        // try{
        //     errores = await validate(usuario);
        //     var mensaje = '';
        // }catch (e) {
        //     console.error(e)
        //     return res.redirect('/usuario/vista/crear?error=Error validadndo datos' + nombreApellidoConsulta);
        // }
        //
        // if (errores.length > 0) {
        //     console.error('Error', errores);
        //     return res.redirect('/usuario/vista/crear?error=Error en los datos' + nombreApellidoConsulta);
        // }else{
        //     let respuestaEditarUsuario
        //     try{
        //         respuestaEditarUsuario = await this._UsuarioService.editarUno(usuarioEditado)
        //     } catch (error) {
        //         console.log(error);
        //         return res.redirect('/usuario/vista/crear?error=Error creando usuario' + nombreApellidoConsulta + cedulaConsulta);
        //     }
        //     if(respuestaEditarUsuario){
        //         return res.redirect('/usuario/vista/inicio?mensaje=Usuario editado.')
        //     } else {
        //         return res.redirect('/usuario/vista/crear?error=Error creando usuario' + nombreApellidoConsulta + cedulaConsulta);
        //     }
        // }
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