let total= 0; 
let confirmacion = true; 
let cantidad= 0; 
let codigo = 0; 
let codigoBorrar = 0; 
let carritoProductos = JSON.parse(localStorage.getItem('carritoProductos')) || []; 
let printCarritoHtml = document.getElementById('printHtml');
let printCarritoVacioHtml = document.getElementById('carrito-vacio');
let productos; 
let itemBorrar;
const btnDeletAll = document.querySelector('#btnDeletAll'); 
const btnCarro1 = document.querySelector('#btnCarro1'); 
const btnCarro2 = document.querySelector('#btnCarro2'); 
const btnCarro3 = document.querySelector('#btnCarro3'); 
const btnCarro4 = document.querySelector('#btnCarro4'); 
const montoTotal = document.querySelector('#montoTotal'); 


const imprimirCarritoEnHtml = (item) => {
    printHtml.innerHTML = ""; 
    for(item of item) {
        productos = document.createElement('tr');
        productos.innerHTML = `<th scope="row">${item.titulo}</th>
                                <td>${item.codigo}</td>
                                <td>$${item.precio}</td>
                                <td><button id="${item.codigo}" type="button" class="borrar btn btn-danger">X</button></td>`;
        
        printHtml.appendChild(productos);
        borrarItem();
    }
}

const montoTotalProductos = () => {
    total = 0;
    for(item of carritoProductos) {
        total += item.precio; 
    }
    return total;
}

montoTotal.innerHTML = ` $${montoTotalProductos()}`;

const borrarItem = ()=> {
    const btnBorrarItem = document.querySelectorAll('tr button'); 
    btnBorrarItem.forEach(btn => { 
        btn.onclick = () => {  
            itemBorrar = parseInt(btn.id)
            const confirmacion = new bootstrap.Modal(document.getElementById('ventanaConfirmacion'));
            confirmacion.show();
            const btnAceptar = document.getElementById('btnAceptar');
            btnAceptar.onclick = () => { 
            carritoProductos = JSON.parse(localStorage.getItem('carritoProductos'));
            const indexItemBorrar = carritoProductos.findIndex(item => item.codigo === itemBorrar)
            carritoProductos.splice(indexItemBorrar, 1);
            localStorage.setItem('carritoProductos', JSON.stringify(carritoProductos));
            location.reload();
            }    
        }    
    })
}

const filtroPorTitulo = (titulo )=> carritoProductos.filter(producto => producto.titulo === titulo);

imprimirCarritoEnHtml(carritoProductos);

if(carritoProductos.length === 0) { 
    productos = document.createElement('div');
    productos.innerHTML = `<div class="alert alert-dark text-center" role="alert">Vaya, tu carrito está vacío. Comienza a agregar productos.</div>`;
    printCarritoVacioHtml.appendChild(productos);
}

btnCarro1.addEventListener("click", () => {
cantidad = ((filtroPorTitulo('Battlefield 2042')).length) + 1; 
const item1 = new Carrito('Battlefield 2042', 1, 2800, cantidad); 
ingresoCarrito(item1);            
}); 
btnCarro2.addEventListener("click", () => { 
cantidad = ((filtroPorTitulo('Blue Protocol')).length) + 1; 
const item2 = new Carrito('Blue Protocol', 2, 2000, cantidad); 
ingresoCarrito(item2);           
}); 
btnCarro3.addEventListener("click", () => { 
cantidad = ((filtroPorTitulo('Halo Infinite')).length) + 1; 
const item3 = new Carrito('Halo Infinite', 3, 2500, cantidad); 
ingresoCarrito(item3);             
}); 
btnCarro4.addEventListener("click", () => { 
cantidad = ((filtroPorTitulo('Elden Ring')).length) + 1; 
const item4 = new Carrito('Elden Ring', 4, 2800, cantidad); 
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

btnDeletAll.addEventListener("click", () => { 
    if(carritoProductos.length >0) {
            carritoProductos = [];
            localStorage.clear();
            location.reload();
        }
    
});