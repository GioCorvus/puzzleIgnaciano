import { Vista } from './vista.js';
import { ModeloPuzzle } from './../models/modelopuzzle.js';

export class Cuatro extends Vista {

  constructor(controlador, base) {
    super(controlador, base);

    this.siguienteImg = document.getElementById('siguienteImg-bach-ciclos');
    this.modelopuzzle = new ModeloPuzzle();

    // Asigna el evento clic al botón
    this.siguienteImg.addEventListener('click', () => this.mostrarSiguienteImgBachCiclos());
    this.contador = 1;
  }

  mostrarSiguienteImgBachCiclos() {
    if (this.contador < 10){
      const imagen = `ignacio0${this.contador}`;
      this.mostrarDatosBachCiclos(imagen);
    }else{
      const imagen = `ignacio${this.contador}`;
      this.mostrarDatosBachCiclos(imagen);
    }
    this.contador++;
  }


  async mostrarDatosBachCiclos(img) {

    const respuesta =await this.modelopuzzle.sacarDatosImagenes(5, img);
    this.mostrarDatosBachCiclosImagenes(respuesta);
  }

  mostrarDatosBachCiclosImagenes(imagenes) {
    const arrayDeImagenes = imagenes.imagenes;
    const contenedorImagenes = document.getElementById("contenedor-imagenes-bach-ciclos");

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
