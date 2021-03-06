import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {HttpJuegoModule} from "./http/http-juego.module";
import {CalculadoraModule} from "./Deber1/calculadora.module";
import {CalculadoraExModule} from "./Examen/calculadoraEx.module";
import {usuarioModule} from "./usuario/usuario.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario/usuario.entity";
import {VacunaEntity} from "./vacuna/vacuna.entity";
import {MascotaEntity} from "./mascota/mascota.entity";
import {VacunaModule} from "./vacuna/vacuna.module";
import {MascotaModule} from "./mascota/mascota.module";

@Module({
  imports: [
      HttpJuegoModule,
      CalculadoraModule,
      CalculadoraExModule,
      usuarioModule,
      MascotaModule,
      VacunaModule,
      TypeOrmModule.forRoot({
          name: 'default',      //nombre de la base de datos
          type: 'mysql',        //tipo de db
          host: 'localhost',    //ip
          port: 3306,           //puerto
          username: 'root',     //usuario
          password: 'root',     //contraseña
          database: 'test',     //base de datos
          entities: [           //Todas las entidades
              UsuarioEntity,
              MascotaEntity,
              VacunaEntity
          ],
          synchronize: true,    //Actualiza lel esquema de la db
          dropSchema: false,    //Elimida datos y esquema de la vase de datos
      })
  ],
  controllers: [
      AppController
  ],
  providers: [
      AppService
  ],
})
export class AppModule {}
