// import { ModeloObra } from './models/modeloobra.js'
import { MenuInicial } from './views/vmenuinicial.js'
import { Uno } from './views/uno.js'
import { Dos } from './views/dos.js'
import { Tres } from './views/tres.js'
import { Cuatro } from './views/cuatro.js'

import { Vista } from './views/vista.js';

export class Controlador {
    vistas = new Map()

    constructor() {
        // this.modeloobra = new ModeloObra()


        //conseguimos la referencia de la interface
        const divMenuInicial = document.getElementById('divMenuInicial')
        const divUno = document.getElementById('divUno')
        const divDos = document.getElementById('divDos')
        const divTres = document.getElementById('divTres')
        const divCuatro = document.getElementById('divCuatro')
    
        //Creamos las vistas 
        this.vistas.set(Vista.vmenuinicial, new MenuInicial(this, divMenuInicial))
        this.vistas.set(Vista.vuno, new Uno(this, divUno))
        this.vistas.set(Vista.vdos, new Dos(this, divDos))
        this.vistas.set(Vista.vtres, new Tres(this, divTres))
        this.vistas.set(Vista.vcuatro, new Cuatro(this, divCuatro))


        
        this.verVista(Vista.vmenuinicial)
   
        
    }

   
    verVista (vista) {
        this.ocultarVistas()
        this.vistas.get(vista).mostrar(true)
    }
    
    ocultarVistas(){
        for(const vista of this.vistas.values())
            vista.mostrar(false)
    }

}

window.onload = () => {new Controlador()}