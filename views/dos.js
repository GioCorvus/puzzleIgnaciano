import { Vista } from './vista.js';
import { ModeloPuzzle } from './../models/modelopuzzle.js';

export class Dos extends Vista {

  constructor(controlador, base) {
    super(controlador, base);

    this.siguienteImg = document.getElementById('siguienteImg-primaria');
    this.modelopuzzle = new ModeloPuzzle();

    // Asigna el evento clic al botón
    this.siguienteImg.addEventListener('click', () => this.mostrarSiguienteImgPrimaria());
    this.contador = 1;
  }
zz
  mostrarSiguienteImgPrimaria() {
    if (this.contador < 10){
      const imagen = `ignacio0${this.contador}`;
      this.mostrarDatosPrimaria(imagen);
    }else{
      const imagen = `ignacio${this.contador}`;
      this.mostrarDatosPrimaria(imagen);
    }
    this.contador++;
  }


  async mostrarDatosPrimaria(img) {

    const respuesta =await this.modelopuzzle.sacarDatosImagenes(3, img);
    this.mostrarDatosPrimariaImagenes(respuesta);
  }

  mostrarDatosPrimariaImagenes(imagenes) {
    const arrayDeImagenes = imagenes.imagenes;
    const contenedorImagenes = document.getElementById("contenedor-imagenes-primaria");

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
