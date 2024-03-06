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
    const contenedorPiezas = document.getElementById('contenidopiezas');

    // Agregamos la capacidad de arrastre a las piezas del puzzle
    piezas.forEach(pieza => {
      pieza.addEventListener('dragstart', this.dragStart.bind(this));
    });

    // Agregamos la capacidad de arrastre y de recibir piezas a las celdas del puzzle
    celdas.forEach(celda => {
      celda.addEventListener('dragstart', this.dragStart.bind(this));
      celda.addEventListener('dragover', this.dragOver.bind(this));
      celda.addEventListener('drop', this.drop.bind(this));
    });

    // Agregamos la capacidad de arrastre y de recibir piezas al contenedor de piezas
    contenedorPiezas.addEventListener('dragover', this.dragOver.bind(this));
    contenedorPiezas.addEventListener('drop', this.drop.bind(this));
    contenedorPiezas.draggable = true;

    // Agregamos la capacidad de arrastre a las celdas del puzzle para volver al contenedor de piezas
    celdas.forEach(celda => {
      celda.draggable = true;
    });
  }

  dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
  }

  dragOver(event) {
    event.preventDefault();
  }

  drop(event) {
    event.preventDefault();
    const piezaId = event.dataTransfer.getData('text/plain');
    const piezaArrastrada = document.getElementById(piezaId);
    const celdaDestino = event.target.closest('.celda');
    const contenedorPiezas = document.getElementById('contenidopiezas');

    if (!celdaDestino || !celdaDestino.classList.contains('celda')) {
      console.error('No se encontró una celda destino válida.');

      // Devolver la pieza al contenedor de piezas
      contenedorPiezas.appendChild(piezaArrastrada);
      return;
    }

    if (celdaDestino.querySelector('.pieza')) {
      console.error('La celda destino ya contiene una pieza.');
      return;
    }

    if (!piezaArrastrada) {
      console.error('No se encontró una pieza válida.');
      return;
    }

    // Si la pieza se encuentra en el contenedor de piezas, la eliminamos de allí
    if (piezaArrastrada.parentNode === contenedorPiezas) {
      piezaArrastrada.parentNode.removeChild(piezaArrastrada);
    }

    // Si la pieza se encuentra en una celda del puzzle, la movemos a la celda destino
    celdaDestino.appendChild(piezaArrastrada);
  }
}