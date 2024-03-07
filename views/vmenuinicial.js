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
    this.setupImageViewer(); 

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
  
    await new Promise(resolve => setTimeout(resolve, 50));
  
    imageElement.style.transition = 'opacity 1s ease';
    imageElement.style.opacity = '0';
  
    setTimeout(() => {
      document.body.removeChild(imageElement);
    }, 1000);
  }

  setupImageViewer() {
    const images = [
      'assets/img/1.jpg',
      'assets/img/2.jpg',
      'assets/img/3.jpg',
      'assets/img/4.jpg'

    ];

    let currentIndex = 0; // Initialize currentIndex to 0
    const imageElement = document.querySelector('.image');
    const prevButton = document.querySelector('.prev-btn');
    const nextButton = document.querySelector('.next-btn');
    imageElement.src = images[0];

    function showImage(index, direction) {

    if (direction === 'prev') {
        imageElement.classList.add('fade-out-prev');
        setTimeout(() => {
            imageElement.src = images[index];
            imageElement.classList.remove('fade-out-prev');
            imageElement.classList.add('fade-in-prev');
            setTimeout(() => {
                imageElement.classList.remove('fade-in-prev');
            }, 500);
        }, 500);
    } else if (direction === 'next') {
        imageElement.classList.add('fade-out-next');
        setTimeout(() => {
            imageElement.src = images[index];
            imageElement.classList.remove('fade-out-next');
            imageElement.classList.add('fade-in-next');
            setTimeout(() => {
                imageElement.classList.remove('fade-in-next');
            }, 500);
        }, 500);
    }
}
    
  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex, 'prev'); // Pass 'prev' as direction
  });
      
  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex, 'next'); // Pass 'next' as direction
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
