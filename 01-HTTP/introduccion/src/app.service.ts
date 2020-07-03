import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
<<<<<<< Updated upstream
    return 'Hola mundo, shwNicolaX!';
=======
    return 'Hello World!';
>>>>>>> Stashed changes
  }
}
