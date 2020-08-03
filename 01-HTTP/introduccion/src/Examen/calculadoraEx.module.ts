import {Module} from "@nestjs/common";
import {CalculadoraExController} from "./calculadoraEx.controller";

@Module({
    imports: [],
    controllers: [
        CalculadoraExController
    ],
    providers: [],
})

export class CalculadoraExModule {

}