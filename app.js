let cantidad = 0; 
let carritoProductos =
JSON.parse(localStorage.getItem("carritoProductos")) || []; 
let codigo = 0; 
let confirmacion; 
let itemBorrar;
let productos;
let total = 0; 
const btnAceptar = document.querySelector('#btnAceptar'); 
const btnCarro1 = document.querySelector("#btnCarro1"); 
const btnCarro2 = document.querySelector("#btnCarro2");  
const btnCarro3 = document.querySelector("#btnCarro3"); 
const btnCarro4 = document.querySelector("#btnCarro4");
const btnComprar = document.querySelector("#btnComprar"); 
const btnDeletAll = document.querySelector("#btnDeletAll"); 
const cantidadTotal = document.querySelector("#cantidad-total"); 
const montoTotal = document.querySelector("#montoTotal"); 
const printCarritoHtml = document.querySelector("#printHtml"); 

    $("#pills-objetivos-tab").on("click", function (e) {
    e.preventDefault();
    $('#mensajes-alerta').empty();
    $(this).tab("show");
    });

    $("#pills-productos-tab").on("click", function (e) {
    e.preventDefault();
    $('#mensajes-alerta').empty();
    $(this).tab("show");
    });

    $("#pills-carrito-tab").on("click", function (e) {
    e.preventDefault();
    $('#mensajes-alerta').empty();
    $(this).tab("show");
    });

const imprimirCarritoEnHtml = () => {
    while (printCarritoHtml.firstChild) {
    printCarritoHtml.removeChild(printCarritoHtml.firstChild);
    }
    carritoProductos.forEach((item) => {
    const precioCantidad = item.precio * item.cantidad;
    productos = document.createElement("tr");
    productos.innerHTML = `<th scope="row"><img src=${item.portada} width="70rem"></th>
                                <td>${item.titulo}</td>
                                <td>${item.plataforma}</td>
                                <td>${item.cantidad}</td>
                                <td>$${precioCantidad}</td>
                                <td><button id="${item.codigo}" type="button" class="borrar btn btn-danger">X</button></td>`;

    printCarritoHtml.appendChild(productos);
    });
    montoTotal.innerHTML = ` $${montoTotalProductos()}`; 
    borrarItem();
    if (carritoProductos.length !== 0) {
        cantidadTotal.innerHTML = `<span class="badge badge-pill bg-danger">${cantidadTotalProductos()}</span>`;
    } else {
    cantidadTotal.innerHTML = "";
    }
};

const montoTotalProductos = () => {
    total = 0;
    for (item of carritoProductos) {
    total += item.precio * item.cantidad; 
    }
    return total;
};
const cantidadTotalProductos = () => {
    total = 0;
    for (item of carritoProductos) {
    total += item.cantidad; 
    }
    return total;
};


const borrarItem = () => {
  const btnBorrarItem = document.querySelectorAll("tr button"); 
    btnBorrarItem.forEach((btn) => { 
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        itemBorrar = parseInt(btn.id); 
        carritoProductos = JSON.parse(localStorage.getItem("carritoProductos"));
        const indexItemBorrar = carritoProductos.findIndex(
        (item) => item.codigo === itemBorrar
        );
        carritoProductos.splice(indexItemBorrar, 1);
        localStorage.setItem(
        "carritoProductos",
        JSON.stringify(carritoProductos)
        );
        imprimirCarritoEnHtml();
        Swal.fire({
          icon: 'error',
          title: 'Has quitado el elemento del carrito',
        })
      });
    });
};

const contarRepeticion = (codigo) =>
  carritoProductos.filter((producto) => producto.codigo === codigo); 
  
function vaciarCarrito () {
    if (carritoProductos.length > 0) {
    carritoProductos = [];
    localStorage.clear();
    imprimirCarritoEnHtml();
    Swal.fire({
      icon: 'error',
      title: 'Has vaciado el carrito',
    })
    }
  }


imprimirCarritoEnHtml(carritoProductos); 

btnCarro1.addEventListener("click", (e) => { 
  e.preventDefault();
  cantidad = contarRepeticion(1).length + 1; 
    const item1 = new Carrito("Battlefield 2042", 1, 2800, cantidad, 'PS4', "/assets/img/battlefield-2042.jpg"); 
  ingresoCarrito(item1); 
  Swal.fire(
    'Agregaste el juego al carrito',
    '',
    'success'
  )
}); 
btnCarro2.addEventListener("click", (e) => {
  e.preventDefault();
  cantidad = contarRepeticion(2).length + 1; 
    const item2 = new Carrito("Blue Protocol", 2, 2000, cantidad, 'PC', "/assets/img/blue-protocol.jpg"); 
  ingresoCarrito(item2); 
  Swal.fire(
    'Agregaste el juego al carrito',
    '',
    'success'
  )
}); 
btnCarro3.addEventListener("click", (e) => { 
  e.preventDefault();
  cantidad = contarRepeticion(3).length + 1; 
    const item3 = new Carrito("Halo Infinite", 3, 2500, cantidad, 'XBOX', "/assets/img/halo-infinite.jpg"); 
  ingresoCarrito(item3); 
  Swal.fire(
    'Agregaste el juego al carrito',
    '',
    'success'
  )
}); 
btnCarro4.addEventListener("click", (e) => { 
  e.preventDefault();
  cantidad = contarRepeticion(4).length + 1; 
    const item4 = new Carrito("Elden Ring", 4, 2800, cantidad, 'PC', "/assets/img/elden-ring.jpg"); 
  ingresoCarrito(item4); 
  Swal.fire(
    'Agregaste el juego al carrito',
    '',
    'success'
  )
}); 


const ingresoCarrito = (item) => {
    const existeItem = carritoProductos.some(
    (producto) => producto.codigo === item.codigo
  ); 
    if (existeItem) {
    const productos = carritoProductos.map((producto) => {
        if (producto.codigo === item.codigo) {
        producto.cantidad++;
        return producto; 
        } else {
        return producto;
        }
    });
    carritoProductos = [...productos]; 
    } else {
    carritoProductos = [...carritoProductos, item]; 
    }
  localStorage.setItem("carritoProductos", JSON.stringify(carritoProductos)); 
  imprimirCarritoEnHtml();
};

class Carrito {
    constructor(titulo, codigo, precio, cantidad, plataforma, portada) {
    this.titulo = titulo;
    this.codigo = codigo;
    this.precio = precio;
    this.cantidad = cantidad;
    this.plataforma = plataforma;
    this.portada = portada;
    }
}

btnDeletAll.addEventListener("click", vaciarCarrito);

btnComprar.addEventListener("click", () => { 
  if(carritoProductos.length !== 0) {
    confirmacion = new bootstrap.Modal(document.querySelector('#ventanaConfirmacion')); 
    confirmacion.show(); 
    vaciarCarrito(); 
    $('#mensajes-alerta').append('<div class="alert alert-success" role="alert">Compra realizada con exito.'); 
    btnAceptar.addEventListener("click", () => {
      confirmacion.hide();
      
  });
}
});