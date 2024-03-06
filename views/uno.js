import { Vista } from './vista.js';
import { Rest } from '../service/rest.js';
export class Uno extends Vista {
  constructor(controlador, base) {
    super(controlador, base);
    this.restService = new Rest();
    this.inicializarDragAndDrop();
  }
  inicializarDragAndDrop() {
    const piezas = document.querySelectorAll('.contenido #contenidopiezas .pieza');
    const celdas = document.querySelectorAll('.contenido #puzzle .celda');

    piezas.forEach(pieza => {
      pieza.addEventListener('dragstart', this.dragStart.bind(this));
    });

    celdas.forEach(celda => {
      celda.addEventListener('dragover', this.dragOver.bind(this));
      celda.addEventListener('drop', this.drop.bind(this));
    });
  }

  dragStart(event) {
    if (event.target.classList.contains('pieza')) {
      const piezaArrastrada = event.target.cloneNode(true);
      event.dataTransfer.setData('text/plain', 'pieza'); // Indicamos que se trata de una pieza
      event.dataTransfer.setDragImage(piezaArrastrada, 0, 0);
    }
  }

  dragOver(event) {
    event.preventDefault();
  }

  drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData('text/plain');

    if (data === 'pieza') {
      const piezaArrastrada = document.querySelector('.contenido #contenidopiezas .pieza');
      const contenedor = event.target.closest('.contenedor-pieza, .celda');

      if (contenedor) {
        const piezaClonada = piezaArrastrada.cloneNode(true);
        contenedor.appendChild(piezaClonada);
        piezaArrastrada.parentNode.removeChild(piezaArrastrada); // Eliminar la pieza del contenedor original
      } else {
        console.error("Elemento objetivo inválido.");
      }
    }
  }
}