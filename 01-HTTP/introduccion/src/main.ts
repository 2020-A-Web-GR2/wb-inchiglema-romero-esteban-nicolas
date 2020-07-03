import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /*
  * AQUI SE PONE TODA LA CONFIGURACION
   */
  await app.listen(3001);
}
bootstrap();
