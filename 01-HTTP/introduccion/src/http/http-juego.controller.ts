import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Header,
    HttpCode,
    Param,
    Post,
    Query, Req, Res
} from "@nestjs/common";
import {MascotaCreateDto} from "./DTO/mascota.create-dto";
import {validate, ValidationError} from "class-validator";

//  http:/127.0.0.1:3001/juegos-http
@Controller('juegos-http')
export class HttpJuegoController {
    @Get('hola')
    @HttpCode(201)

    holaGet(){
        throw new BadRequestException('No envia nada')
        return 'Hola, te pico la cola 😝 ... GET';
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

    @Get('/parametros-consulta')
    parametrosConsultaEjemplo(
        @Query() parametrosConsulta
    ){
        console.log('Parametros de Consulta: ', parametrosConsulta);
        if (parametrosConsulta.nombre && parametrosConsulta.apellido)
            return parametrosConsulta.nombre + ' ' + parametrosConsulta.apellido;
        else
            return("😃");
    }

    @Post('/parametros-cuerpo')
    async parametrosCuerpoEjemplo(
        @Body() parametrosCuerpo
    ) {
        // Validador
        const mascotaValidador = new MascotaCreateDto();
        mascotaValidador.casada = parametrosCuerpo.casada;
        mascotaValidador.edad = parametrosCuerpo.edad;
        mascotaValidador.ligada = parametrosCuerpo.ligada;
        mascotaValidador.nombre = parametrosCuerpo.nombre;
        mascotaValidador.peso = parametrosCuerpo.peso;

        try {
            const errores: ValidationError[] = await validate(mascotaValidador);
            if (errores.length > 0) {
                console.error('Error', errores);
                throw new BadRequestException('Error al validar.')
            } else {
                const mensajeCorrecto = {
                    mensaje: 'Se creo correctamente'
                }
                return mensajeCorrecto;
            }
        } catch (e) {
            console.error('Error', e);
            throw new BadRequestException('Error al validar.')
        }
    }

    @Get('/guardarCookieInsegura')
    guardarCookkieInsegura(
        @Query() parametrosConsulta,
        @Req() req,     //peticion
        @Res() res      //respuesta
    ) {
        res.cookie(
            'galletaInsegura', //Nombre
            'Tengo hambre', //Valor
            );
        res.send({
            mensaje: 'ok'
        })
    }

    @Get('/mostrarCookies')
    mostrarCookies(
        @Req() req
    ) {
        const mensaje = {
            sinFirmar: req.cookies,
            firmadas: req.signedCookies
        };
        return mensaje;
    }

    @Get('/guardarCookieFirmada')
    guardarCookieFirmada(
        @Res() res
    ){
        res.cookie('firmada', 'poliburguer', {signed: true});
        const mensaje = {
            mensaje: 'ok'
        };
        res.send(mensaje);
    }
}