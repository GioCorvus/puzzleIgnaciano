import { Vista } from './vista.js';
import { Rest } from '../service/rest.js';

export class Uno extends Vista {

  constructor(controlador, base) {
    super(controlador, base);
    this.restService = new Rest();
    this.crearGrid(2,2)
  }

  crearGrid(x,y){
    //X Columnas
    //Y Filas
    console.log("CrearGrid")
    const tablero = document.getElementById('puzzle');
    tablero.innerHTML = '';

    tablero.style.gridTemplateColumns = `repeat(${x}, 1fr)`;
    tablero.style.gridTemplateRows = `repeat(${y}, 1fr)`;

    for (let i = 0; i < x * y; i++) {
        const celda = document.createElement('div');
        celda.className="celda";
        tablero.appendChild(celda);
    }
  }

  validarPuzzle(){

  }
}
