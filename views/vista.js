export class Vista {
    static {
      Vista.vmenuinicial = Symbol('Inicio') //Hacerlo con todas las vistas
      Vista.vuno = Symbol('Uno')
      Vista.vdos = Symbol('Dos')
      Vista.vtres = Symbol('Tres')
      Vista.vcuatro = Symbol('Cuatro')

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
  }