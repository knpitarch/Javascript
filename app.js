let confirmacion0 = true;
let confirmacion1 = true; 
let confirmacion2 = true; 
let confirmacion3 = true; 
let idItm = 0; 
let itemBorrar = 0; 
let itemModf = 0; 
let itemGral = 0; 
let itemFiltrar = 0; 
let itemGame; 
let repeticion = 0; 
let videoJuegos = JSON.parse(localStorage.getItem('videoJuegos')) || []; 
let printHtml = document.getElementById('printHtml');
let videoJuego; 
let copiaVideoJuegos = [ ...videoJuegos]; 
let resultado;
const btnIngr = document.querySelector("#btnEjec"); 
const btnDelet = document.querySelector("#btnDelet");
const btnDeletAll = document.querySelector('#btnDeletAll');
const btnMins = document.getElementById('btnMins');  
const btnModf = document.querySelector('#btnModf'); 
const btnOrder = document.querySelector("#btnOrder"); 
const btnCurs = document.getElementById('btnCursiva'); 
const btnSubr = document.getElementById('btnSubrayado'); 
const textoHtml = document.getElementById('printHtml');

const imprimirEnHtml = (item) => {
    printHtml.innerHTML = ""; 
    for(item of item) {
        videoJuego = document.createElement('tr');
        videoJuego.innerHTML = `<th scope="row">${item.idItm}</th>
                                <td>${item.titulo}</td>
                                <td>${item.plataforma}</td>
                                <td>${item.genero}</td>
                                <td>${item.anio}</td>
                                <td>$${item.precio}</td>
                                <td>${item.stock} u</td>`;
        printHtml.appendChild(videoJuego);
    }
}

imprimirEnHtml(videoJuegos); 

const filtroPorIdtm = (idItm) => videoJuegos.filter(videoJuego => videoJuego.idItm === idItm); 
const filtroPorTitulo = (titulo )=> videoJuegos.filter(videoJuego => videoJuego.titulo === titulo); 
const filtroPorPlataforma = (plataforma )=> videoJuegos.filter(videoJuego => videoJuego.plataforma === plataforma); 
const filtroPorGenero = (genero )=> videoJuegos.filter(videoJuego => videoJuego.genero === genero); 
const filtroPorAnio = (anio )=> videoJuegos.filter(videoJuego => videoJuego.anio === anio); 

const busquedaPorIdtm = (idItm) => videoJuegos.find(videoJuego => videoJuego.idItm === idItm); 

const ingresarDatos = () => {
    let titulo = prompt("Ingrese nombre videojuego.", "MORTAL KOMBAT 4"); 
    if(titulo === null)  { return {}
    } else {
     titulo = titulo.toUpperCase()};

    let plataforma = prompt("Ingrese plataforma videojuego. [PC]-[XBOX]-[PS]...", "PC"); 
    if(plataforma === null)  { return {} 
    } else {
     plataforma = plataforma.toUpperCase()};
    
    const repeticionTitulo = filtroPorTitulo(titulo); 
    const repeticionPlataforma = repeticionTitulo.filter(arrayTitulo => arrayTitulo.plataforma === plataforma);
    
    if(repeticionPlataforma.length > 0) { 
        confirmacion0 = confirm(`El videojuego ${titulo} para la plataforma ${plataforma}, ya fue ingresado.\nEsta seguro de volver a ingresarlo?`); 
        if(confirmacion0 !== true) {
            return {};  
        }
    }

    let genero = prompt("Ingrese genero videojuego. [ACCION]-[AVENTURA]-[FPS]...", "ACCION"); 
    if(genero === null)  { return {} 
    } else {
     genero = genero.toUpperCase()}; 

    let anio = parseInt(prompt("Ingrese año videojuego. [1997]-[2001]-[2019]...", 1997)); 
    if(isNaN(anio)) { return {} }; 
    
    let precio = parseFloat(prompt("Ingrese precio videojuego.", 1000)); 
    if(isNaN(precio)) { return {}  
    } else {
        precio = precio.toFixed(2)}; 
    
    let stock = parseInt(prompt("Ingrese stock videojuego.", 120)); 
    if(isNaN(stock)) { return {} }; 
    
    repeticion = repeticionPlataforma.length + 1; 
    let itemDuplicado
    repeticion >= 2 ? itemDuplicado = true : itemDuplicado= false;

    return { titulo, plataforma, genero, anio, precio, stock, itemDuplicado }; 
};

class VideoJuego {
    constructor(idItm, titulo, plataforma, genero, anio, precio, stock, itemDuplicado) { 
        this.idItm = idItm;
        this.titulo = titulo;
        this.plataforma = plataforma;
        this.genero = genero;
        this.anio = anio;
        this.precio = precio;
        this.stock = stock;
        this.duplicado = itemDuplicado;
    }
    printConsole() {
        console.log(
            `%cITEM #${this.idItm} - veces ingresado(${repeticion})`,
            "color: black; font-weight: bold; background:#e17b2a;"); 
        console.log(
            `TÍTULO: ${this.titulo}\nPLATAFORMA: ${this.plataforma}\nGENERO: ${this.genero}\nAÑO: ${this.anio}\nPRECIO: ${this.precio}\nSTOCK: ${this.stock}\n----------------------------\n`
        );
    }
}


btnIngr.addEventListener("click", () => {

    do { 
        const { titulo, plataforma, genero, anio, precio, stock, itemDuplicado } = ingresarDatos(); 
        if (titulo === undefined) {     
            break; 
        } else {
            if(videoJuegos.length > 0) {
                let ultimoObjeto = [...videoJuegos].pop();
                idItm = ultimoObjeto.idItm;
            } else { idItm = 0;}
            
            idItm++
            itemGame = new VideoJuego(
                idItm,
                titulo,
                plataforma,
                genero,
                anio,
                precio,
                stock,
                itemDuplicado
            );
            videoJuegos.push(itemGame);
            localStorage.setItem('videoJuegos', JSON.stringify(videoJuegos)); 
            itemGame.printConsole();
            location.reload();
        }

        confirmacion1 = confirm("Desea ingresar un nuevo item?");
    } while (confirmacion1); 
    console.log(
        "%cLISTADO DE ITEMS INGRESADOS",
        "color: white; font-size: 16px; font-weight: bold; background: blue;"
    );
    console.table(videoJuegos);
});

btnModf.addEventListener("click", () => { 
    if(videoJuegos.length > 0) {
        do {
            itemModf = parseInt(prompt("Ingrese el número de item a mofificar")); 
            if (isNaN(itemModf)) {
                confirmacion2 = false;
            } else if (busquedaPorIdtm(itemModf) !== undefined) {
                confirmacion2 = confirm(`Desea modificar el item #${itemModf} del listado?`);
                videoJuegos = JSON.parse(localStorage.getItem('videoJuegos'));
                itemGral = parseInt(prompt(`Campo a Modificar Item #${itemModf}\n[1]-Titulo\n[2]-Plataforma\n[3]-Genero\n[4]-Año\n[5]-Precio\n[6]-Stock`));
                if(isNaN(itemGral)) {
                confirmacion2 = false;
                break;
                }
                switch (itemGral) {
                    case 1:        
                        itemGral = prompt(`Item #${itemModf}\nIngresar nuevo Titulo`).toUpperCase();
                        videoJuegos.map((dato) => {  
                            if(dato.idItm === itemModf) {
                                dato.titulo = itemGral;
                            } return dato;
                        });
                        break;
                    case 2:       
                        itemGral = prompt(`Item #${itemModf}\nIngresar nueva Plataforma`).toUpperCase();
                        videoJuegos.map((dato) => {  
                            if(dato.idItm === itemModf) {
                                dato.plataforma = itemGral;
                            } return dato;
                            });
                            break;
                    case 3:        
                        itemGral = prompt(`Item #${itemModf}\nIngresar nuevo Genero`).toUpperCase();
                        videoJuegos.map((dato) => {  
                            if(dato.idItm === itemModf) {
                                dato.genero = itemGral;
                            } return dato;
                            });
                            break;
                    case 4:        // Se elige modificar Año.
                        itemGral = parseInt(prompt(`Item #${itemModf}\nIngresar nuevo Año`));
                        videoJuegos.map((dato) => {
                            if(dato.idItm === itemModf) {
                                dato.anio = itemGral;
                            } return dato;
                            });
                            break;
                    case 5:        
                        itemGral = parseFloat(prompt(`Item #${itemModf}\nIngresar nuevo Precio`)).toFixed(2);
                        videoJuegos.map((dato) => {  
                            if(dato.idItm === itemModf) {
                                dato.precio = itemGral;
                            } return dato;
                            });
                            break;
                    case 6:        
                        itemGral = parseInt(prompt(`Item #${itemModf}\nIngresar nuevo Stock`));
                        videoJuegos.map((dato) => {   
                            if(dato.idItm === itemModf) {
                                dato.stock = itemGral;
                            } return dato;
                            });
                            break;
                    default:
                        alert("Operador Invalido"); 
                            break;
                }
                localStorage.setItem('videoJuegos', JSON.stringify(videoJuegos));
                console.table(
                    "%cLISTADO DE ITEMS INGRESADOS",
                    "color: white; font-size: 16px; font-weight: bold; background: blue;"
                );
                console.table(videoJuegos);
                location.reload();

            } else {
                alert(`El item #${itemModf} no existe en el listado`);
            }
    
        } while (confirmacion2);

    }});

btnDelet.addEventListener("click", () => {


    if(videoJuegos.length > 0) {
        do {
            itemBorrar = parseInt(prompt("Ingrese el número de item a borrar"));
            if (isNaN(itemBorrar)) {
                confirmacion2 = false;
            } else if (busquedaPorIdtm(itemBorrar) !== undefined) { 
                confirmacion2 = confirm(`Desea quitar item #${itemBorrar} del listado?`);
                videoJuegos = JSON.parse(localStorage.getItem('videoJuegos'));
                let indexItemBorrar = videoJuegos.findIndex(videoJuego => videoJuego.idItm === itemBorrar);
                videoJuegos.splice(indexItemBorrar, 1);
                localStorage.setItem('videoJuegos', JSON.stringify(videoJuegos));
                console.table(
                    "%cLISTADO DE ITEMS INGRESADOS",
                    "color: white; font-size: 16px; font-weight: bold; background: blue;"
                );
                console.table(videoJuegos);
                location.reload(); 

            } else {
                alert(`El item #${itemBorrar} no existe en el listado`);
            }
    
        } while (confirmacion2);
    }
});

btnDeletAll.addEventListener("click", () => {
    if(videoJuegos.length >0) {
    confirmacion2 = confirm('Desea quitar todos los items del listado?');
        if(confirmacion2) {
            localStorage.clear();
            location.reload();
        }
    }
    
});

btnOrder.addEventListener("click", () => {
    
    do{
        
        itemGral = parseInt(prompt("Desea\n[1]-Ordenar por Campo\n[2]-Filtrar por Campo"));
        if(isNaN(itemGral)) {
                confirmacion3 = false
                break;
        };
        switch (itemGral) {
            case 1:
                itemGral = parseInt(prompt("Elegir Campo a Ordenar\n[1]-Item#\n[2]-Titulo\n[3]-Plataforma\n[4]-Genero\n[5]-Año\n[6]-Precio\n[7]-Stock"));
                switch (itemGral){
                    case 1:
                        itemGral = parseInt(prompt("Ordenar Campo Item#\n[1]-Ascendente\n[2]-Descendente")); 
                        if(itemGral === 1) { //
                            copiaVideoJuegos.sort((a,b) => a.idItm - b.idItm); 
                            console.table(copiaVideoJuegos);
                        } else if (itemGral === 2) {
                            copiaVideoJuegos.sort((a,b) => b.idItm - a.idItm);
                            console.table(copiaVideoJuegos);
                        } else { 
                            alert("Operador Invalido" );
                        }
                        break;
                    case 2:
                        itemGral = parseInt(prompt("Ordenar Campo Titulo\n[1]-Ascendente\n[2]-Descendente"));
                        if(itemGral === 1) {
                            copiaVideoJuegos.sort((a,b) => (a.titulo).localeCompare(b.titulo));
                            console.table(copiaVideoJuegos);
                        } else if (itemGral === 2) {
                            copiaVideoJuegos.sort((a,b) => (b.titulo).localeCompare(a.titulo));
                            console.table(copiaVideoJuegos);
                        } else { 
                            alert("Operador Invalido" );
                        }
                        break;
                    case 3:
                        itemGral = parseInt(prompt("Ordenar Campo Plataforma\n[1]-Ascendente\n[2]-Descendente")); 
                        if(itemGral === 1) {
                            copiaVideoJuegos.sort((a,b) => (a.plataforma).localeCompare(b.plataforma));
                            console.table(copiaVideoJuegos); //
                        } else if (itemGral === 2) {
                            copiaVideoJuegos.sort((a,b) => (b.plataforma).localeCompare(a.plataforma));
                            console.table(copiaVideoJuegos);
                        } else { 
                            alert("Operador Invalido" );
                        }
                        break;
                    case 4:
                        itemGral = parseInt(prompt("Ordenar Campo Genero\n[1]-Ascendente\n[2]-Descendente")); 
                        if(itemGral === 1) { // 
                            copiaVideoJuegos.sort((a,b) => (a.genero).localeCompare(b.genero));
                            console.table(copiaVideoJuegos); //
                        } else if (itemGral === 2) { //
                            copiaVideoJuegos.sort((a,b) => (b.genero).localeCompare(a.genero));
                            console.table(copiaVideoJuegos);
                        } else { 
                            alert("Operador Invalido" );
                        }
                        break;
                    case 5:
                        itemGral = parseInt(prompt("Ordenar Campo Año\n[1]-Ascendente\n[2]-Descendente")); 
                        if(itemGral === 1) { // 
                            copiaVideoJuegos.sort((a,b) => a.anio - b.anio);
                            console.table(copiaVideoJuegos); //
                        } else if (itemGral === 2) { //
                            copiaVideoJuegos.sort((a,b) => b.anio - a.anio);
                            console.table(copiaVideoJuegos);
                        } else { 
                            alert("Operador Invalido");
                        }
                        break;
                    case 6:
                        itemGral = parseInt(prompt("Ordenar Campo Precio\n[1]-Ascendente\n[2]-Descendente")); 
                        if(itemGral === 1) { // 
                            copiaVideoJuegos.sort((a,b) => a.precio - b.precio);
                            console.table(copiaVideoJuegos); //
                        } else if (itemGral === 2) { //
                            copiaVideoJuegos.sort((a,b) => b.precio - a.precio);
                            console.table(copiaVideoJuegos);
                        } else { 
                            alert("Operador Invalido");
                        }
                        break;
                    case 7:
                        itemGral = parseInt(prompt("Ordenar Campo Stock\n[1]-Ascendente\n[2]-Descendente")); 
                        if(itemGral === 1) { // 
                            copiaVideoJuegos.sort((a,b) => a.stock - b.stock);
                            console.table(copiaVideoJuegos); //
                        } else if (itemGral === 2) { //
                            copiaVideoJuegos.sort((a,b) => b.stock - a.stock);
                            console.table(copiaVideoJuegos);
                        } else { 
                            alert("Operador Invalido");
                        }
                        break;
                    default:
                            alert("Operador Invalido");
                            break;    
                    }
                    imprimirEnHtml(copiaVideoJuegos);
                    break;
            case 2: 
                itemFiltrar = parseInt(prompt("Elegir Campo a Filtrar\n[1]-Item#\n[2]-Titulo\n[3]-Plataforma\n[4]-Genero\n[5]-Año"));
                switch (itemFiltrar){
                    case 1:
                        itemFiltrar = parseInt(prompt("Ingresar Item#"));
                        resultado = filtroPorIdtm(itemFiltrar)
                        console.table(resultado);
                        ;
                        break;
                    case 2:
                        itemFiltrar = prompt("Ingresar Titulo").toUpperCase();
                        resultado = filtroPorTitulo(itemFiltrar)
                        console.table(resultado);
                        break;
                    case 3:
                        itemFiltrar = prompt("Ingresar Plataforma [PC]-[XBOX]-[PS]...").toUpperCase();
                        resultado = filtroPorPlataforma(itemFiltrar)
                        console.table(resultado); 
                        break;
                    case 4:
                        itemFiltrar = prompt("Ingresar Genero [ACCION]-[AVENTURA]-[FPS]...").toUpperCase();
                        resultado = filtroPorGenero(itemFiltrar)
                        console.table(resultado);
                        break;
                    case 5:
                        itemFiltrar = parseInt(prompt("Ingresar Año [1997]-[2001]-[2019]..."));
                        resultado = filtroPorAnio(itemFiltrar)
                        console.table(resultado);
                        break;
                    default:
                        alert("Operador Invalido" );
                        break;    
                }
                    imprimirEnHtml(resultado)
                    break;
            default:
                alert("Operador Invalido");
                break;
        }
        
        confirmacion3 = confirm("Desea continuar?");
        
    } while(confirmacion3);
});



btnMins.addEventListener('click', () => { 
    textoHtml.classList.toggle('lowercase');
});

btnCurs.addEventListener('click', () => {
    textoHtml.classList.toggle('italics');
});

btnSubr.addEventListener('click', () => { 
    textoHtml.classList.toggle('underline');
});