import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cookieParser = require('cookie-parser');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /*
  * AQUI SE PONE TODA LA CONFIGURACION
   */
  const cookieParser = require('cookie-parser');
  app.use(cookieParser('poliburger'));
  await app.listen(3000);
}
bootstrap();
