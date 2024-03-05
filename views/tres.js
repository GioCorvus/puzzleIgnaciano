import { Vista } from './vista.js';
import { Rest } from '../service/rest.js';

export class Tres extends Vista {

  constructor(controlador, base) {
    super(controlador, base);
    this.restService = new Rest();
  }


}
