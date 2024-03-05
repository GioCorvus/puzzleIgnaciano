import { Vista } from './vista.js';
import { Rest } from '../service/rest.js';

export class MenuInicial extends Vista {

  constructor(controlador, base) {
    super(controlador, base);
    this.restService = new Rest();



    // this.irLibros = this.base.querySelectorAll('button')[0];
    // this.irAutores = this.base.querySelectorAll('button')[1];

    // this.irLibros.onclick = this.pulsarIrLibros.bind(this);
    // this.irAutores.onclick = this.pulsarIrAutores.bind(this);




    this.imagenPortada();
    this.setupImageViewer(); // Call setupImageViewer to initialize the image viewer

  }

  async imagenPortada() {
    console.log("Portada cargada con éxito")
    const imageElement = document.createElement('img');
    imageElement.src = 'assets/img/portada.png'; 
    imageElement.style.width = '100%';
    imageElement.style.height = '100%';
    imageElement.style.position = 'fixed';
    imageElement.style.top = '0';
    imageElement.style.left = '0';
    imageElement.style.opacity = '1';
  
    document.body.appendChild(imageElement);
  
    await new Promise(resolve => setTimeout(resolve, 0));
  
    imageElement.style.transition = 'opacity 1s ease';
    imageElement.style.opacity = '0';
  
    setTimeout(() => {
      document.body.removeChild(imageElement);
    }, 1000);
  }

  setupImageViewer() {
    const images = [
      'assets/img/icoHielo.png',
      'assets/img/icoLight.png',
      'assets/img/icoRead.png',
      'assets/img/icoVamp.png'

    ];
  
    let currentIndex = 0;
    const imageElement = document.querySelector('.image');
    const prevButton = document.querySelector('.prev-btn');
    const nextButton = document.querySelector('.next-btn');
  
    function showImage(index) {
      // Agregar la clase fade-out para iniciar la animación de desvanecimiento
      imageElement.classList.add('fade-out');
      
      setTimeout(() => {
        // Cambiar la imagen después de que se haya completado la animación de desvanecimiento
        imageElement.src = images[index];
        
        // Eliminar la clase fade-out después de cambiar la imagen para permitir la animación de aparecer
        setTimeout(() => {
          imageElement.classList.remove('fade-out');
        }, 100);
      }, 500);
    }
    
    prevButton.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      showImage(currentIndex);
      console.log("wololo")
    });
    
    nextButton.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % images.length;
      showImage(currentIndex);
    });
    
    imageElement.addEventListener('click', () => {
      switch (currentIndex) {
          case 0:
              this.pulsarUno();
              break;
          case 1:
              this.pulsarDos();
              break;
          case 2:
              this.pulsarTres();
              break;
          case 3:
              this.pulsarCuatro();
              break;
          default:
              break;
      }
  });

    // Mostrar la primera imagen al cargar la página
    showImage(currentIndex);
  }

  pulsarUno(){
    console.log("wololo1")
    this.controlador.verVista(Vista.vuno);

  }

  pulsarDos(){
    console.log("wololo2")
    this.controlador.verVista(Vista.vdos);

  }

  pulsarTres(){
    console.log("wololo3")
    this.controlador.verVista(Vista.vtres);

  }

  pulsarCuatro(){
    console.log("wololo4")
    this.controlador.verVista(Vista.vcuatro);

  }



}
