import {Module} from "@nestjs/common";
import {usuarioController} from "./usuario.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {usuarioService} from "./usuario.service";
import {MascotaModule} from "../mascota/mascota.module";

@Module({
    imports: [
        MascotaModule,
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
    providers: [
        usuarioService
    ],
})

export class usuarioModule {

}