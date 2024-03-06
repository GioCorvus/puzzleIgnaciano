import { Vista } from './vista.js';
import { Rest } from '../service/rest.js';

/* Este método es para inicializar el drag and drop para las piezas del puzzle */
export class Uno extends Vista {

  constructor(controlador, base) {
    super(controlador, base);
    this.restService = new Rest();
    this.inicializarDragAndDrop();

  }

  /* Este método es para inicializar el drag and drop */
  inicializarDragAndDrop() {
    const piezas = document.querySelectorAll('.contenido #contenidopiezas .pieza');
    const celdas = document.querySelectorAll('.contenido #puzzle .celda');

    piezas.forEach(pieza => {
      pieza.addEventListener('dragstart', this.dragStart);
    });

    celdas.forEach(celda => {
      celda.addEventListener('dragover', this.dragOver);
      celda.addEventListener('drop', this.drop);
    });
  }

/* Este método es para manejar el inicio del arrastre de una pieza */
dragStart(event) {
  // Verificar si la pieza pertenece a la clase .pieza antes de permitir el arrastre
  if (event.target.classList.contains('pieza')) {
    event.dataTransfer.setData('text/plain', event.target.outerHTML); // Transferir el HTML de la imagen
  }
}




  /* Este método es para manejar el evento de arrastre sobre una celda */
  dragOver(event) {
    event.preventDefault();
  }

  /* Este método es para manejar el evento de soltar una pieza en una celda */
  drop(event) {
    event.preventDefault();
    const draggedPieceHTML = event.dataTransfer.getData('text/plain');
    const celda = event.target;
    const piezaArrastrada = document.querySelector('.contenido #contenidopiezas .pieza[draggable="true"]');
  
    if (celda.classList.contains('celda')) {
      celda.innerHTML = draggedPieceHTML;
      if (piezaArrastrada) {
        piezaArrastrada.remove(); // Elimina la pieza arrastrada de su ubicación original
      }
    } else {
      console.error("Elemento objetivo inválido.");
    }
  }
  
}
