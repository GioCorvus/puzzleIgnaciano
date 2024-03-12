import { ModeloPuzzle } from './../models/modelopuzzle.js';
import { Vista } from './vista.js';

export class Uno extends Vista {
  constructor(controlador, base) {
    super(controlador, base);

    this.siguienteImg = document.getElementById('siguienteImg');
    
    this.modelopuzzle = new ModeloPuzzle();
  
    this.nivel = null; 

    // Asigna el evento clic al botón
    this.siguienteImg.addEventListener('click', () => this.mostrarSiguienteImg());
    this.contador = 1;
    this.totalPuzzles = 16;
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
        celda.id="celda"+(i+1);
        tablero.appendChild(celda);
    }
  }

  mostrar(visible, nivel) {
    super.mostrar(visible);

    if (visible) {
        this.nivel = nivel; // Almacena el nivel cuando se muestra la vista Uno
        console.log(`Mostrando Vista Uno con nivel ${this.nivel}`);
    }
  }

  mostrarSiguienteImg() {
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
    console.log('NIVEL: ' + this.nivel);
    const respuesta = await this.modelopuzzle.sacarDatosImagenes(this.nivel, img);
    this.mostrarDatosImagenes(respuesta);
    this.mostrarDimensiones(respuesta);

    if (this.puzzlesCompletados === this.totalPuzzles) {
        alert('¡Felicidades! Has completado todos los puzzles del nivel.');
        this.regresarAlMenuInicial();  // Función para volver al menú inicial
    }
}

  mostrarDatosImagenes(imagenes) {
    console.log(imagenes)
    const arrayDeImagenes = imagenes.imagenes;
     const contenedorImagenes = document.getElementById("contenidopiezas");
    

    while (contenedorImagenes.firstChild) {
      contenedorImagenes.removeChild(contenedorImagenes.firstChild)
    }

    arrayDeImagenes.forEach((imagen, index) => {
      const imgElement = document.createElement("img");
      imgElement.id = `pieza${index + 1}`;
      imgElement.className = "pieza";
      imgElement.draggable = true;
      imgElement.src = `data:image/jpeg;base64,${imagen}`;
      imgElement.alt = `Imagen ${index + 1}`;
    
      contenedorImagenes.appendChild(imgElement);
    });    

    this.mostrarDimensiones(imagenes);

  }

  mostrarDimensiones(dimensiones) {
    const nX = dimensiones.nX;
    const nY = dimensiones.nY;
    const lado = dimensiones.lado;
    this.crearGrid(nX, nY)

    this.inicializarDragAndDrop();

  }

  inicializarDragAndDrop() {
    try {
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

      // Eliminamos la capacidad de arrastre de las celdas del puzzle
      celdas.forEach(celda => {
        celda.draggable = false;
      });
    } catch (error) {
      console.error('Error al inicializar drag and drop:', error.message);
    }
  }

  dragStart(event) {
    try {
      event.dataTransfer.setData('text/plain', event.target.id);
    } catch (error) {
      console.error('Error en dragStart:', error.message);
    }
  }

  dragOver(event) {
    try {
      event.preventDefault();
    } catch (error) {
      console.error('Error en dragOver:', error.message);
    }
  }

  drop(event) {
    try {
      event.preventDefault();
      const piezaId = event.dataTransfer.getData('text/plain');
      const piezaArrastrada = document.getElementById(piezaId);
      const celdaDestino = event.target.closest('.celda');
      const contenedorPiezas = document.getElementById('contenidopiezas');

      // Verificar si la pieza arrastrada es de la clase ".celda"
      if (piezaArrastrada.classList.contains('celda')) {
        console.error('La pieza arrastrada es una celda, no se puede soltar en este lugar.');
        return;
      }
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
    } catch (error) {
      console.error('Error en drop:', error.message);
    }
  }
}
