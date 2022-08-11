let total= 0; 
let confirmacion0 = true; 
let cantidad= 0; 
let codigo = 0; 
let codigoBorrar = 0; 
let carritoProductos = JSON.parse(localStorage.getItem('carritoProductos')) || []; 
let printHtml = document.getElementById('printHtml');
let productos; 
const btnDelet = document.querySelector("#btnDelet"); 
const btnDeletAll = document.querySelector('#btnDeletAll'); 
const btnCarro1 = document.querySelector('#btnCarro1'); 
const btnCarro2 = document.querySelector('#btnCarro2'); 
const btnCarro3 = document.querySelector('#btnCarro3'); 
const btnCarro4 = document.querySelector('#btnCarro4'); 
const montoTotal = document.querySelector('#montoTotal'); 
const cantidadItem = document.querySelector('#casillaCantidad'); 

const imprimirEnHtml = (item) => {
    printHtml.innerHTML = ""; 
    for(item of item) {
        productos = document.createElement('tr');
        productos.innerHTML = `<th scope="row">${item.titulo}</th>
                            <td>${item.codigo}</td>
                            <td>$${item.precio}</td>
                            <td><input id='casillaCantidad' class='text-center' type='number' value='${cantidad}'></input></td>`;
                                
        printHtml.appendChild(productos);
    }
}
const filtroPorTitulo = (titulo )=> carritoProductos.filter(producto => producto.titulo === titulo); 

const busquedaPorCodigo = (codigo) => carritoProductos.find(producto => producto.codigo === codigo); 

imprimirEnHtml(carritoProductos); 

btnCarro1.addEventListener("click", () => { 
cantidad = ((filtroPorTitulo('Mortal Kombat 11')).length) + 1; 
const item1 = new Carrito('Mortal Kombat 11', 1, 2800, cantidad); 
ingresoCarrito(item1);       
}); 
btnCarro2.addEventListener("click", () => { 
cantidad = ((filtroPorTitulo('Assasins Creed Revelations')).length) + 1; 
const item2 = new Carrito('Assasins Creed Revelations', 2, 2000, cantidad); 
ingresoCarrito(item2);           
}); 
btnCarro3.addEventListener("click", () => { 
cantidad = ((filtroPorTitulo('Captain Tsubasa Rise Of New Champions')).length) + 1; 
const item3 = new Carrito('Captain Tsubasa Rise Of New Champions', 3, 2500, cantidad); 
ingresoCarrito(item3);              
}); 
btnCarro4.addEventListener("click", () => { 
cantidad = ((filtroPorTitulo('FIFA 23')).length) + 1; 
const item4 = new Carrito('FIFA 23', 4, 3000, cantidad); 
ingresoCarrito(item4);             
}); 

const ingresoCarrito = (item) => { 
carritoProductos.push(item);
localStorage.setItem('carritoProductos', JSON.stringify(carritoProductos)); 

location.reload();

}

class Carrito {
    constructor(titulo, codigo, precio, cantidad) { 
        this.titulo = titulo;
        this.codigo = codigo;
        this.precio = precio;
        this.cantidad = cantidad;
    }  
}

btnDelet.addEventListener("click", () => { 

    if(carritoProductos.length > 0) {
        do {
            codigoBorrar = parseInt(prompt("Ingrese el código del producto a borrar")); 
            if (isNaN(codigoBorrar)) { 
                confirmacion0 = false;
            } else if (busquedaPorCodigo(codigoBorrar) !== undefined) { 
                confirmacion0 = confirm(`Desea quitar el código #${codigoBorrar} del listado?`); 
                carritoProductos = JSON.parse(localStorage.getItem('carritoProductos')); 
                let indexItemBorrar = carritoProductos.findIndex(producto => producto.codigo === codigoBorrar); 
                carritoProductos.splice(indexItemBorrar, 1); 
                localStorage.setItem('carritoProductos', JSON.stringify(carritoProductos)); 
                location.reload(); 

            } else {
                alert(`El item #${codigoBorrar} no existe en el listado`); 
            }
    
        } while (confirmacion0); // 
    }
}); 

btnDeletAll.addEventListener("click", () => { 
    if(carritoProductos.length >0) {
            carritoProductos = [];
            localStorage.clear();
            location.reload();
        }
    
});