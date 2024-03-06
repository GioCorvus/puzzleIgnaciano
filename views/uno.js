import { ModeloPuzzle } from './../models/modelopuzzle.js';
import { Vista } from './vista.js';

export class Uno extends Vista {
  constructor(controlador, base) {
    super(controlador, base);

    this.siguienteImg = document.getElementById('siguienteImg-infantil');
    this.modelopuzzle = new ModeloPuzzle();

    // Asigna el evento clic al botón
    this.siguienteImg.addEventListener('click', () => this.mostrarSiguienteImgInfantil());
    this.contador = 1;
  }

  mostrarSiguienteImgInfantil() {
    if (this.contador < 10){
      const imagen = `ignacio0${this.contador}`;
      this.mostrarDatosInfantil(imagen);
    }else{
      const imagen = `ignacio${this.contador}`;
      this.mostrarDatosInfantil(imagen);
    }
    this.contador++;
  }


  async mostrarDatosInfantil(img) {

    const respuesta =await this.modelopuzzle.sacarDatosImagenes(2, img);
    this.mostrarDatosInfantilImagenes(respuesta);
    this.mostrarDimensionesInfantil(respuesta);
  }

  mostrarDatosInfantilImagenes(imagenes) {
    const arrayDeImagenes = imagenes.imagenes;
    const contenedorImagenes = document.getElementById("contenedor-imagenes-infantil");

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

  mostrarDimensionesInfantil(dimensiones) {
    const nX = dimensiones.nX;
    const nY = dimensiones.nY;
    const lado = dimensiones.lado;
    console.log(nX, nY, lado);
  }
}
