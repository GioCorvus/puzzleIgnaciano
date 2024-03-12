// import { ModeloObra } from './models/modeloobra.js'
import { MenuInicial } from './views/vmenuinicial.js'
import { Uno } from './views/uno.js'
import { Dos } from './views/dos.js'

import { Vista } from './views/vista.js';

export class Controlador {
    vistas = new Map()

    constructor() {
        // this.modeloobra = new ModeloObra()

        //conseguimos la referencia de la interface
        const divMenuInicial = document.getElementById('divMenuInicial')
        const divUno = document.getElementById('divUno')
        const divDos = document.getElementById('divDos')
    
        //Creamos las vistas 
        this.vistas.set(Vista.vmenuinicial, new MenuInicial(this, divMenuInicial))
        this.vistas.set(Vista.vuno, new Uno(this, divUno))
        this.vistas.set(Vista.vdos, new Dos(this, divDos))
         
        this.verVista(Vista.vmenuinicial)
    }

    verVista(vista, nivel) {
        this.ocultarVistas();
        this.vistas.get(vista).mostrar(true, nivel);
    }
    cargar(vista){
        this.vistas.get(vista).cargar()
    }
    
    ocultarVistas(){
        for(const vista of this.vistas.values())
            vista.mostrar(false)
    }
}

window.onload = () => {new Controlador()}