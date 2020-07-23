import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {HttpJuegoModule} from "./http/http-juego.module";
import {CalculadoraModule} from "./Deber1/calculadora.module";

@Module({
  imports: [
      HttpJuegoModule,
      CalculadoraModule
  ],
  controllers: [
      AppController
  ],
  providers: [
      AppService
  ],
})
export class AppModule {}
