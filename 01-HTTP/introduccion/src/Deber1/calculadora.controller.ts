import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param, Post,
    Put,
    Query,
    Req,
    Res
} from "@nestjs/common";
import {validate, ValidationError} from "class-validator";
import {NameCreateDto} from "./DTO/name.create-dto";
import {NumerosCreateDto} from "./DTO/numeros.create-dto";
import {DivisionCreateDto} from "./DTO/division.create-dto";

@Controller('/calculator')
export class CalculadoraController {
    @Get('/saveUserName')
    @HttpCode(201)
    async saveUserName(
        @Query() parametrosConsulta,
        @Res() res
    ) {
        const nameValidator = new NameCreateDto();
        nameValidator.name = parametrosConsulta.name;

        try {
            const errores: ValidationError[] = await validate(nameValidator);
            if (errores.length > 0) {
                console.error('Error', errores);
                throw new BadRequestException('Incorrect user name.');
            } else {
                res.cookie(
                    'name',
                    nameValidator.name,
                );
                res.send({
                    mensage: 'User name ' + parametrosConsulta.name + ' succesfully saved.'
                });
            }
        } catch (e) {
            console.error('Error', e);
            throw new BadRequestException('Incorrect user name.');
        }
    }

    @Get('/suma')
    @HttpCode(200)
    async suma(
        @Query() num,
        @Req() req
    ) {
        const username = req.cookies.name;
        const numberVal = new NumerosCreateDto();
        numberVal.n1 = Number(num.n1);
        numberVal.n2 = Number(num.n2);

        if (username !== undefined) {
            try {
                const errores: ValidationError[] = await validate(numberVal);
                if (errores.length > 0) {
                    console.error('Error', errores);
                    throw new BadRequestException('It must be numbers.');
                } else {
                    const ans = numberVal.n1 + numberVal.n2;
                    return numberVal.n1 + ' + ' + numberVal.n2 + ' = ' + ans;
                }
            } catch (e) {
                console.error('Error', e);
                throw new BadRequestException('It must be numbers.');
            }
        } else {
            return 'Not found username cookie.'
        }
    }

    @Put('/resta')
    @HttpCode(201)
    async resta(
        @Body() num,
        @Req() req
    ) {
        const username = req.cookies.name;
        const numberVal = new NumerosCreateDto();
        numberVal.n1 = Number(num.n1);
        numberVal.n2 = Number(num.n2);

        if (username !== undefined) {
            try {
                const errores: ValidationError[] = await validate(numberVal);
                if (errores.length > 0) {
                    console.error('Error', errores);
                    throw new BadRequestException('It must be numbers.');
                } else {
                    const ans = numberVal.n1 - numberVal.n2;
                    return numberVal.n1 + ' - ' + numberVal.n2 + ' = ' + ans;
                }
            } catch (e) {
                console.error('Error', e);
                throw new BadRequestException('It must be numbers.');
            }
        } else {
            return 'Not found username cookie.'
        }
    }

    @Delete('/multiplicacion')
    @HttpCode(200)
    async multiplicacion(
        @Req() req
    ) {
        const username = req.cookies.name;
        const numberVal = new NumerosCreateDto();
        numberVal.n1 = Number(req.headers.n1);
        numberVal.n2 = Number(req.headers.n2);

        if (username !== undefined) {
            try {
                const errores: ValidationError[] = await validate(numberVal);
                if (errores.length > 0) {
                    console.error('Error', errores);
                    throw new BadRequestException('It must be numbers.');
                } else {
                    const ans = numberVal.n1 - numberVal.n2;
                    return numberVal.n1 + ' - ' + numberVal.n2 + ' = ' + ans;
                }
            } catch (e) {
                console.error('Error', e);
                throw new BadRequestException('It must be numbers.');
            }
        } else {
            return 'Not found username cookie.'
        }
    }

    @Post('/division/:n1/:n2')
    @HttpCode(201)
    async division(
        @Req() req,
        @Param() num
    ) {
        const username = req.cookies.name;
        const numberVal = new DivisionCreateDto();
        numberVal.n1 = Number(num.n1);
        numberVal.n2 = Number(num.n2);

        if (username !== undefined) {
            try {
                const errores: ValidationError[] = await validate(numberVal);
                if (errores.length > 0) {
                    console.error('Error', errores);
                    throw new BadRequestException('It must be numbers and n2 must be diferent of zero.');
                } else {
                    const ans = numberVal.n1 / numberVal.n2;
                    return numberVal.n1 + ' / ' + numberVal.n2 + ' = ' + ans;
                }
            } catch (e) {
                console.error('Error', e);
                throw new BadRequestException('It must be numbers and n2 must be diferent of zero.');
            }
        } else {
            return 'Not found username cookie.'
        }
    }
}