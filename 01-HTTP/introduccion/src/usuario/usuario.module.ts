import {Module} from "@nestjs/common";
import {usuarioController} from "./usuario.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [
                UsuarioEntity
            ],
            'default'
        )
    ],
    controllers: [
        usuarioController
    ],
    providers: [],
})

export class usuarioModule {

}