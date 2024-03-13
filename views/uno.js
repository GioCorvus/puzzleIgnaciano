import { ModeloPuzzle } from './../models/modelopuzzle.js';
import { Vista } from './vista.js';

export class Uno extends Vista {
  constructor(controlador, base) {
    super(controlador, base);

    this.dificultad;
    this.arrayImagenes=[];

    this.siguienteImg = document.getElementById('siguienteImg');
    this.textoImagen = document.getElementById('textoImagen');
    this.textos;
    this.modelopuzzle = new ModeloPuzzle();
  

    // Asigna el evento clic al botón
    this.siguienteImg.addEventListener('click', () => this.mostrarSiguienteImg());
    this.contador = 1;
    this.totalPuzzles = 16;
  }

  aplicarRotacionAleatoria(imagen) {
    // Genera un ángulo aleatorio entre 0 y 3 (0, 90, 180 o 270 grados)
    let anguloAleatorio = Math.floor(Math.random() * 4) * 90;
    let self=this
    // Aplica la rotación aleatoria a la imagen utilizando transform
    imagen.style.transform = 'rotate(' + anguloAleatorio + 'deg)';
    
    // Verifica si la imagen está centrada
    if (anguloAleatorio % 360 === 0) {
        console.log("La imagen está centrada");
    }
    
    // Agrega un evento de doble clic a la imagen para rotarla 90 grados a la derecha
    imagen.addEventListener("dblclick", function() {
        // Obtiene el ángulo actual de rotación de la imagen
        let anguloActual = parseInt(imagen.style.transform.replace('rotate(', '').replace('deg)', ''));
        
        // Calcula el nuevo ángulo de rotación (90 grados a la derecha)
        let nuevoAngulo = (anguloActual + 90) % 360;
        
        // Aplica la rotación a la imagen
        imagen.style.transform = 'rotate(' + nuevoAngulo + 'deg)';
        
        // Actualiza el ángulo aleatorio para futuras rotaciones
        anguloAleatorio = nuevoAngulo;
        self.validarPuzzle()
        // Verifica si la imagen está centrada después de la rotación
        if (nuevoAngulo % 360 === 0) {
            console.log("La imagen está centrada");
        }
    });
}
  crearGrid(x,y){
    //X Columnas
    //Y Filas
    console.log("CrearGrid")
    const tablero = document.getElementById('puzzle');
    tablero.innerHTML = '';
    
    let anchototal=document.getElementById('contenidotablero').offsetWidth;
    let anchopiezafinal=(anchototal*0.7)/x

    tablero.style.gridTemplateColumns = `repeat(${x}, 1fr)`;
    tablero.style.gridTemplateRows = `repeat(${y}, 1fr)`;
  
    for (let i = 0; i < x * y; i++) {
        const celda = document.createElement('div');
        celda.className="celda";
        celda.id="celda"+(i+1);
        celda.style.width=anchopiezafinal+ "px";
        celda.style.height=anchopiezafinal+ "px";
        tablero.appendChild(celda);
    }
  }

  mostrar(visible, nivel) {
    super.mostrar(visible);
    //this.mostrarSiguienteImg()
    if (visible) {
        this.dificultad = nivel; // Almacena el nivel cuando se muestra la vista Uno
        console.log(`Mostrando Vista Uno con nivel ${this.nivel}`);
    }
  }
  validarPuzzle() {
      console.log("validar");
      
      // Selecciona todas las celdas con la clase "celda"
      let celdas = document.querySelectorAll('.celda');

      // Array para almacenar las imágenes dentro de las celdas
      let arrayPiezas = [];

      // Itera sobre cada celda
      celdas.forEach(function(celda) {
          // Buscar imágenes con la clase "pieza" dentro de la celda actual
          let piezasEnCelda = celda.querySelectorAll('.pieza');
          
          // Itera sobre las imágenes encontradas y agregarlas al array
          piezasEnCelda.forEach(function(pieza) {
              arrayPiezas.push(pieza);
          });
      });
     
      if(this.sonArraysIguales(arrayPiezas,this.arrayImagenes)){
        this.controlador.verVista(Vista.vdos);
      }
      // Ahora arrayCeldas contiene todas las imágenes dentro de las celdas con id "celda"
      console.log(arrayPiezas);
      console.log(this.arrayImagenes);
  }

  sonArraysIguales(array1, array2) {
    // Verificar si tienen la misma longitud
    if (array1.length !== array2.length) {
        return false;
    }
    // Iterar sobre los elementos de uno de los arrays y compararlos con los elementos del otro array
    for (let i = 0; i < array1.length; i++) {
      var transformValue = array1[i].style.transform;

      // Utilizar una expresión regular para extraer el número de rotación
      var matches = transformValue.match(/rotate\(([-0-9]+)deg\)/);
      
      // Verificar si se encontró una coincidencia y extraer el número
      var angulo = matches ? parseInt(matches[1]) : 0;

      if (array1[i] !== array2[i] ||angulo%360!=0) {
        return false;
      }
    }

    // Si todas las comparaciones son iguales, los arrays son iguales
    return true;
}

  mostrarSiguienteImg() {
    this.controlador.verVista(Vista.vuno,this.dificultad);
    if (this.contador < 10){
      const imagen = `ignacio0${this.contador}`;
      this.mostrarDatosInfantil(imagen);
    }else{
      const imagen = `ignacio${this.contador}`;
      this.mostrarDatosInfantil(imagen);

    }
    this.textoImagen.innerHTML='<p>'+this.textos[this.contador]+'</p>';
    this.contador++;
  }


  async mostrarDatosInfantil(img) {
    const respuesta =await this.modelopuzzle.sacarDatosImagenes(this.dificultad, img);
    this.mostrarDatosInfantilImagenes(respuesta);
    this.mostrarDimensiones(respuesta);
    this.guardarordenPiezas();
  }
  guardarordenPiezas() {
    // Selecciona todas las imágenes con la clase "pieza"
    let imagenes = document.querySelectorAll('.pieza');

    // Crea un array vacío para almacenar las imágenes en orden
    let self = this;
    self.arrayImagenes = [];

    imagenes.forEach(function(imagen) {
      self.arrayImagenes.push(imagen);
    });

    //Limpiar las piezas
    const contenedorpiezas=document.getElementById("contenidopiezas");
    contenedorpiezas.innerHTML="";
    let arrayDesordenado = self.arrayImagenes.slice().sort(function() {
      return 0.5 - Math.random();
    });

    arrayDesordenado.forEach(function(elemento) {
      contenedorpiezas.appendChild(elemento)
    });
    
    // Itera sobre las imágenes y guárdalas en el array
    imagenes.forEach(function(imagen) {
        //Aplicarles la rotacion
        if(self.dificultad>2){
          self.aplicarRotacionAleatoria(imagen)
        }
    });
  }
  mostrarDatosInfantilImagenes(imagenes) {
    const arrayDeImagenes = imagenes.imagenes;
    const contenedorImagenes = document.getElementById("contenidopiezas");
    let imagenresultado = document.getElementById("imagen");
    let imagencompleta=imagenes.foto;

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
    imagenresultado.src=`data:image/jpeg;base64,${imagencompleta}`;

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
      this.validarPuzzle();
    } catch (error) {
      console.error('Error en drop:', error.message);
    }
  }
  textos = {
    1: "En una colina verde, bajo el cielo azul de Loyola, un joven llamado Ignacio corría con un bate de madera en la mano. A su lado, un pez azul saltaba del río, como si quisiera unirse a la aventura. Ignacio, vestido con sencillez pero con el corazón lleno de valentía, se dirigía hacia la antigua fortaleza que había sido su hogar.<br>La fortaleza de Loyola, con sus piedras gastadas por el tiempo, era testigo del cambio que se gestaba en el corazón de Ignacio. Es un joven soldado valiente y orgulloso con el afán de luchar.",
    2: "Iñigo, apasionado por la gloria y la aventura, vio su vida transformada tras ser herido en una batalla durante un trágico día.<br>Postrado en la cama, sin acceso a sus libros de caballería, encontró consuelo en textos religiosos que lo llevaron a una profunda reflexión espiritual…",
    3: "San Ignacio de Loyola, inicialmente un hombre que llevaba una vida poco virtuosa, experimentó una transformación espiritual después de lesionarse gravemente en una batalla. Durante su convalecencia, se inspiró en la lectura de libros sobre Jesús y los santos, lo que lo llevó a cambiar radicalmente su vida y a fundar la Compañía de Jesús para servir a Dios y a los demás.<br>Esta experiencia marcó el inicio de su camino hacia la santidad y su dedicación a ayudar a los demás siguiendo el ejemplo de Jesús.",
    4: "En su juventud, Ignacio era un caballero y soldado. Durante la Batalla de Pamplona en 1521, resultó gravemente herido por una bala de cañón. Durante su convalecencia, comenzó a leer libros sobre la vida de Cristo y los santos. Este período de recuperación marcó un cambio profundo en su vida. La imagen podría simbolizar ese momento en el que Ignacio, aún en su armadura, reflexiona sobre su propósito y destino.",
    5: "En ese momento mágico, San Ignacio sintió el amor y la paz de Dios en su corazón. Desde ese día, decidió ser un soldado para Dios y dedicar su vida a compartir el amor y la bondad con los demás.",
    6: "Ignacio era un hombre santo que amaba a Dios y a los demás. Un día, conoció a un anciano que no tenía casa ni familia. Ignacio le habló de Dios y de su vida. El anciano se sintió feliz y quiso ser amigo de Ignacio. Ignacio le dijo que era su hermano y que podía ser un jesuita.<br>Así, el anciano se unió a la Compañía de Jesús y vivió con Ignacio. Juntos, siguieron el camino del señor con alegría y humildad.",
    7: "Pedro era un niño enfermo que estaba en el hospital. El anciano era un hombre bueno que le contó la historia de Ignacio, un hombre santo que amaba a Dios y a los demás. Pedro se sintió feliz y quiso ser amigo del anciano. El anciano le dijo que era su nieto y que podía ser un jesuita.<br>Pedro se unió a la Compañía de Jesús y fue discípulo del anciano, ayudando a mucha gente con amor.",
    8: "Despidiendo el hospital, San Ignacio recordando las personas que se encontró en su instancia dando la palabra de Jesús, marca su rumbo hacia su próxima aventura. ",
    9: "Durante su convalecencia, comenzó a leer libros sobre la vida de Cristo y los santos. Este período de recuperación marcó un cambio profundo en su vida. La imagen podría simbolizar ese momento en el que Ignacio, aún en su armadura, reflexiona sobre su propósito y destino.",
    10: "San Ignacio con dos amigos crearon la Compañía de Jesús, para mostrar el mundo el amor y la bondad que querían compartir.<br>El letrero brillaba bajo el sol, y la gente se detenía para leerlo. Decían: “¿Qué es esta Compañía de Jesús?”. San Ignacio sonreía y les contaba historias de amistad, compasión y servicio. Sus amigos asentían, y pronto más personas se unieron a su causa.<br>Así, la Compañía de Jesús creció, como un árbol fuerte con raíces profundas.",
    11: "Ignacio, junto a sus amigos, los integrantes de la nueva fundada compañía, celebra en comunión con todos los demás.",
    12: "En un tiempo de grandes cambios y descubrimientos, San Ignacio de Loyola, el valiente fundador de la Compañía de Jesús, recorría tierras lejanas llevando consigo no más que su fe y sus enseñanzas. Su corazón ardía con el deseo de compartir la luz del Evangelio y las revelaciones que había recibido durante sus momentos más íntimos de oración y contemplación.",
    13: "Un hombre que una vez blandió la espada en batalla, pero ahora porta la bandera del amor y el servicio. Su viaje lo ha llevado a través de valles de dudas y montañas de revelación, hasta llegar a este momento, donde su misión se despliega ante el mundo.<br>Mientras los peregrinos pasan, algunos se detienen, atraídos por la claridad de su mensaje. Ignacio les habla con pasión, sus palabras fluyen como un río de esperanza, instando a todos a encontrar a Dios en cada acto de amor, en cada gesto de servicio.",
    14: "Más tarde, en el año 1540, el papa Pablo aprobó oficialmente la fundación de la Compañía De Jesús. Durante los primeros años, Ignacio y los primeros miembros de la Compañía, promovieron la formación espiritual, estableciendo colegios y misiones en distintas partes del mundo.",
    15: "En la quietud de la habitación, San Ignacio traspasa su sabiduría al joven, sellando un legado que perdurará por los siglos. En la penumbra, la Compañía de Jesús se prepara para enfrentar los desafíos del mañana, guiada por el faro de las Constituciones.<br>La luz divina ilumina su propósito, desde la juventud ardiente hasta la madurez serena, en un eterno ciclo de servicio y devoción.",
    16: "Y así termina la historia de San Ignacio de Loyola."
  }
}