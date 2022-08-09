const btnEjec = document.querySelector('#btnEjec'); 
const btnDelet = document.querySelector('#btnDelet'); 
let listadoJuegos = []; 
let confirmacion1 = true; 
let confirmacion2 = true; 
let idItm = 0; 
let itemBorrar = 0; 

btnEjec.addEventListener('click', () => { 

class VideoJuego {
    constructor(idItm, titulo, plataforma, genero, anio, stock){  
        this.idItm = idItm;
        this.titulo = titulo;
        this.plataforma = plataforma;
        this.genero = genero;
        this.anio = anio;
        this.stock = stock;
    }
    printConsole(){ 
        console.log(`%cITEM #${this.idItm}`,'color: black; font-weight: bold; background:#0f0;'); 
        console.log(`TÍTULO: ${this.titulo}\nPLATAFORMA: ${this.plataforma}\nGENERO: ${this.genero}\nAÑO: ${this.anio}\nSTOCK: ${this.stock}\n----------------------------\n`);
    
    }
}

const ingresarDatos = () => {

    let titulo = prompt('Ingrese nombre videojuego.', 'COUNTER-STRIKE 1.6'); 
    titulo === null ? titulo ='SIN NOMBRE' : titulo = titulo.toUpperCase();
    
    let plataforma = prompt('Ingrese plataforma videojuego.', 'PC'); 
    plataforma === null ? plataforma ='SIN PLATAFORMA' : plataforma = plataforma.toUpperCase();

    let genero = prompt('Ingrese genero videojuego.', 'FPS'); 
    genero === null ? genero = 'SIN GENERO' : genero = genero.toUpperCase(); 

    let anio = parseInt(prompt('Ingrese año videojuego.', 1999)); 
    isNaN(anio) ? anio = 0 : anio = anio; 

    let stock = parseInt(prompt('Ingrese stock videojuego.', 10)); 
    isNaN(stock) ? stock = 0 : stock = stock; 
    

    return {titulo , plataforma, genero, anio, stock} ; 
}


do { 
    const {titulo, plataforma, genero, anio, stock} = ingresarDatos(); 

    if(titulo === '' ) { 
    console.warn('Error: Item no valido - Debe asignar un Nombre al item.'); 

    } else { 

    idItm++ 
    let itemGame = new VideoJuego(idItm, titulo, plataforma, genero, anio , stock); 
    listadoJuegos.push(itemGame);
    itemGame.printConsole(); 
    }
    
   confirmacion1 = confirm("Desea ingresar un nuevo item?"); 

} while(confirmacion1);
    console.log('%cLISTADO DE ITEMS INGRESADOS', 'color: white; font-size: 16px; font-weight: bold; background: blue;');
    console.table(listadoJuegos); 

}); 

btnDelet.addEventListener('click', () => { 

    do{
        itemBorrar = parseInt (prompt("Ingrese el número de item a borrar")); 

        const items = listadoJuegos.filter( item =>{ 
            return item.idItm === itemBorrar;
        })

        if(isNaN(itemBorrar)) { 
            confirmacion2 = false
        } else if (items.length > 0) { 
            confirmacion2 = confirm(`Desea quitar item #${itemBorrar} del listado?`); 
            switch (confirmacion2) { 
                case true:
                let i = itemBorrar - 1; 
                delete listadoJuegos[i]; 
                console.log('%cLISTADO DE ITEMS INGRESADOS', 'color: white; font-size: 16px; font-weight: bold; background: blue;'); 
                console.table(listadoJuegos); 
            }
        } else {
            alert(`El item #${itemBorrar} no existe en el listado`); 
        }
    } while(confirmacion2); 
}); 