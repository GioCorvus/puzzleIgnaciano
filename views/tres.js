import { Vista } from './vista.js';
import { ModeloPuzzle } from './../models/modelopuzzle.js';

export class Tres extends Vista {

  constructor(controlador, base) {
    super(controlador, base);

    this.siguienteImg = document.getElementById('siguienteImg-eso');
    this.modelopuzzle = new ModeloPuzzle();

    // Asigna el evento clic al botón
    this.siguienteImg.addEventListener('click', () => this.mostrarSiguienteImgEso());
    this.contador = 1;
  }

  mostrarSiguienteImgEso() {
    if (this.contador < 10){
      const imagen = `ignacio0${this.contador}`;
      this.mostrarDatosEso(imagen);
    }else{
      const imagen = `ignacio${this.contador}`;
      this.mostrarDatosEso(imagen);
    }
    this.contador++;
  }


  async mostrarDatosEso(img) {

    const respuesta =await this.modelopuzzle.sacarDatosImagenes(4, img);
    this.mostrarDatosEsoImagenes(respuesta);
  }

  mostrarDatosEsoImagenes(imagenes) {
    const arrayDeImagenes = imagenes.imagenes;
    const contenedorImagenes = document.getElementById("contenedor-imagenes-eso");

    while (contenedorImagenes.firstChild) {
      contenedorImagenes.removeChild(contenedorImagenes.firstChild)
    }

    arrayDeImagenes.forEach((imagen, index) => {
      const imgElement = document.createElement("img");
      imgElement.src = `data:image/jpeg;base64,${imagen}`;
      imgElement.alt = `Imagen ${index + 1}`;
    
      contenedorImagenes.appendChild(imgElement);
    });    
  }
}
