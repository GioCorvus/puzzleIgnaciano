import { Vista } from './vista.js';
import { Rest } from '../service/rest.js';

export class Uno extends Vista {

  constructor(controlador, base) {
    super(controlador, base);
    this.restService = new Rest();
  }

  crearGrid(x,y){

  }

}
