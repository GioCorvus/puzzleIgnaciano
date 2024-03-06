import { Rest } from "../service/rest.js";

export class ModeloPuzzle {
    constructor () {
      this.rest = new Rest()
    }

    async sacarDatosImagenes(dim, img) {
        const respuesta = await this.rest.sacarDatosImagenes(dim, img);
        if (respuesta) {
            return respuesta;
        } else {
            console.error('Hubo un error al crear el autor.');
            return null;
        }
    }
    
  }