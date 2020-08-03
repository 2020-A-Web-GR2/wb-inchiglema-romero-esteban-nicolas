import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";

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

    @Get()
    mostrarTodos(){
        return this.arrayUsers;
    }

    @Post()
    crearUno(
        @Body() parametrosCuerpo
    ){
        this.idActual += 1;
        const nuevoUsuario = {
            id: this.idActual,
            nombre: parametrosCuerpo.nombre
        };
        this.arrayUsers.push(nuevoUsuario);
        return nuevoUsuario;
    }

    @Get(':id')
    mostrarUno(
        @Param() parametrosRuta
    ){
        const indice = this.arrayUsers.findIndex(
            (usuario) => usuario.id === Number(parametrosRuta.id)
        )
        return this.arrayUsers[indice];
    }

    @Put(':id')
    editarUno(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo
    ){
        const indice = this.arrayUsers.findIndex(
            (usuario) => usuario.id === Number(parametrosRuta.id)
        )
        this.arrayUsers[indice].nombre = parametrosCuerpo.nombre;
        return this.arrayUsers[indice];
    }

    @Delete(':id')
    eliminarUno(
        @Param() parametrosRuta
    ){
        const indice = this.arrayUsers.findIndex(
            (usuario) => usuario.id === Number(parametrosRuta.id)
        )
        this.arrayUsers.splice(indice,1);
        return this.arrayUsers;
    }

    //RESTful - Json
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

}