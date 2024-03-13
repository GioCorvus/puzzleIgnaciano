export class Vista {
    static {
      Vista.vmenuinicial = Symbol('Inicio') //Hacerlo con todas las vistas
      Vista.vuno = Symbol('Uno')
      Vista.vdos = Symbol('Dos')
      Vista.css_infantil = Symbol('style-infantil') // Simbolos del css
      Vista.css_eso = Symbol('style-eso')
    }
  
    constructor(controlador, base) {
      this.controlador = controlador
      this.base = base
    }
  
    mostrar(ver) {
      if (ver)
        this.base.style.display = 'block'
      else 
        this.base.style.display = 'none'
    }
    cargar(){
      this.mostrarSiguienteImg();
    }
    mostrarSiguienteImg() {
      if (this.contador < 10){
        const imagen = `ignacio0${this.contador}`;
        this.mostrarDatosInfantil(imagen);
      }else{
        const imagen = `ignacio${this.contador}`;
        this.mostrarDatosInfantil(imagen);
      }
      console.log("cargarimagenes")
      this.controlador.verVista(Vista.vuno);
      this.contador++;
    }
  }