import {BadRequestException, Controller, Delete, Get, Header, HttpCode, Param, Post} from "@nestjs/common";

//  http:/127.0.0.1:3001/juegos-http
@Controller('juegos-http')
export class HttpJuegoController {
    @Get('hola')
    @HttpCode(201)

    holaGet(){
        throw new BadRequestException('No envia nada')
        //return 'Hola, te pico la cola 😝 ... GET';
    }

    @Post('hola')
    @HttpCode(202)

    holaPost(){
        return 'Hola, te pico la cola 😝 ... POST';
    }

    @Delete('hola')
    @HttpCode(204)
    @Header('Cache-control', 'none')
    @Header('EPN', 'provando las cosas')

    holaDelete(){
        return 'Hola, te pico la cola 😝 ... DELETE';
    }

    // http://127.0.0.1:3001/juegos-http/parametros-ruta/22/gestion/180
    @Get('/parametros-ruta/:edad/gestion/:altura')

    parametrosRutaEjemplo(
        @Param() parametrosRuta
    ){
        console.log('Parametros: ', parametrosRuta);

        let edad = 0;
        if (!isNaN(Number(parametrosRuta.edad)))
            edad = Number(parametrosRuta.edad);
        else
            throw new BadRequestException('Error capa 8: Edad no es un numero');

        let altura = 0;
        if (!isNaN(Number(parametrosRuta.altura)))
            altura = Number(parametrosRuta.altura);
        else
            throw new BadRequestException('Error capa 8: Altura no es un numero');
        return edad+altura;
    }

}