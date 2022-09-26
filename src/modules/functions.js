import { renderizarProductos, renderizarSliders, renderizarCarrito } from '../modules/renders.js';
import { btnVaciarCarrito, cantidadTotal, nombreUsuario } from '../modules/selectors.js';
import { db, guardarObjetosDB, guardarDatosDB, actualizarDatosDB, auth } from '../modules/crud-firestore.js';

export let carritoProductos = JSON.parse(localStorage.getItem('carritoProductos')) || []; 

export const leerDatosDB = async (coleccion) => {
    await db.collection(coleccion).onSnapshot((onSnapshot) => { 
        const data = onSnapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
        habilitarSolapas();
        renderizarProductos(data);
        renderizarSliders(data);
        renderizarCarrito();
        detectarBotones(data);
        vaciarCarrito();

    })
};

export const borrarItem = () => {
    const btnBorrarItem = document.querySelectorAll('.btn-borrar'); 
    btnBorrarItem.forEach(btn => {   
        btn.addEventListener('click', (e) => {  
            e.stopPropagation(); 
            let itemBorrar = parseInt(btn.id); 
            carritoProductos = JSON.parse(localStorage.getItem('carritoProductos')); 
            const indexItemBorrar = carritoProductos.findIndex(item => item.id === itemBorrar);
            carritoProductos.splice(indexItemBorrar, 1);            
            localStorage.setItem('carritoProductos', JSON.stringify(carritoProductos));  
            renderizarCarrito(); 
        })
    })
};

export const montoTotalProductos = () => {
    let total = 0;
    if (carritoProductos.length != 0) {
        carritoProductos.forEach(item => {
            total += item.precio * item.cantidad; 
        })
    };
    return total;
};

export const indicadorCantidad = () => {
    if (carritoProductos.length != 0) {
        cantidadTotal.innerHTML = `<span class="badge rounded-pill">${carritoProductos.length}</span>`;
    } else {
        cantidadTotal.innerHTML = '';
    }
};

export const mensajeCarroVacio = () => {
    if (carritoProductos.length === 0) { 
        $('#carro-vacio').fadeIn(300);
        $('#encabezado-carrito').hide();
        $('.monto-total').hide();
        $('.btn-carrito').hide();
    } else {
        $('#carro-vacio').hide(); 
        $('#encabezado-carrito').show();
        $('.monto-total').show();
        $('.btn-carrito').show();
    }

};

export const detectarBotones = (data) => {
    const botones = document.querySelectorAll('.card button');
    botones.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const producto = data.find(item => item.id === parseInt(btn.id));
            if (producto.stock === 1) {
                btn.disabled = true;
                btn.innerHTML = 'Sin Stock';
            };

            if (carritoProductos.length === 0 || producto.cantidad === undefined) { 

                producto.cantidad = 1;
            }
            ingresoCarrito(producto); 

        })
    })
};


export const ingresoCarrito = (item) => {
    let productos;
    const existeItemEnCarrito = carritoProductos.some(producto => producto.id === item.id); 
    if (existeItemEnCarrito) {
        productos = carritoProductos.map(producto => { 
            if (producto.id === item.id) {
                producto.cantidad++;
                return producto; 
            } else {
                return producto; 
            }
        });
        carritoProductos = [...productos]; 
    } else {

        item.cantidad = 1;
        carritoProductos = [...carritoProductos, item]; 
    }

    localStorage.setItem('carritoProductos', JSON.stringify(carritoProductos)); 
    renderizarCarrito(); 
};

export const vaciarCarrito = () => {
    btnVaciarCarrito.addEventListener("click", () => {
        if (carritoProductos.length != 0) {
            carritoProductos = []; 
            localStorage.setItem('carritoProductos', JSON.stringify(carritoProductos)); 
            renderizarCarrito();
            return;
        }
    })
};


export const cambiarCantidad = () => {
    const btnCantidad = document.querySelectorAll('.btn-cantidad');
    btnCantidad.forEach(btn => {   
        btn.addEventListener('click', (e) => {  
            e.stopPropagation(); 
            let itemCambiar = parseInt(btn.id); 
            if (e.target.classList.contains('btn-sumar')) { 
                carritoProductos = JSON.parse(localStorage.getItem('carritoProductos')); 
                const producto = carritoProductos.find(item => item.id === itemCambiar);
                if (producto.cantidad < producto.stock) {
                    producto.cantidad++; 
                    localStorage.setItem('carritoProductos', JSON.stringify(carritoProductos)); 
                    renderizarCarrito();
                } else { btn.disabled = true };

            } else if (e.target.classList.contains('btn-restar')) {
                const producto = carritoProductos.find(item => item.id === itemCambiar);
                if (producto.cantidad > 1) {
                    producto.cantidad--; 
                    localStorage.setItem('carritoProductos', JSON.stringify(carritoProductos)); 
                    renderizarCarrito();
                } else { btn.disabled = true }
            }
        }
        )
    })
};

const visibleLogout = document.querySelectorAll(".visible-logout");
const visibleLogin = document.querySelectorAll(".visible-login");

const mostrarIconos = (user) => {
    if (user) {
        visibleLogin.forEach((icono) => (icono.style.display = "block"));
        visibleLogout.forEach((icono) => (icono.style.display = "none"));
    } else {
        visibleLogin.forEach((icono) => (icono.style.display = "none"));
        visibleLogout.forEach((icono => (icono.style.display = "block")));
    }
};

export const habilitarSolapas = () => {
    $('#pills-signin-tab').on('click', function (e) {
        e.preventDefault()
        $(this).tab('show')
    })

    $('#pills-signup-tab').on('click', function (e) {
        e.preventDefault()
        $(this).tab('show')
    })

    $('#pills-logout-tab').on('click', function (e) {
        e.preventDefault()
        $(this).tab('show')
    })

    $('#pills-productos-tab').on('click', function (e) {
        e.preventDefault()
        $(this).tab('show')
    })
    $('#pills-login-tab').on('click', function (e) {
        e.preventDefault()
        $(this).tab('show')
    })
    $('#pills-historial-tab').on('click', function (e) {
        e.preventDefault()
        $(this).tab('show')
    })

    $('#pills-carrito-tab').on('click', function (e) {
        e.preventDefault()
        $(this).tab('show')
    })
};

$('#btnComprar').on('click', (e) => {
    e.preventDefault();
    guardarDatosDB(carritoProductos, 'transaccion');
    carritoProductos.forEach(item => {
        const id = (item.id).toString();
        const stock = (item.stock - item.cantidad);
        actualizarDatosDB('games', id, stock);
        carritoProductos = [];
        localStorage.setItem('carritoProductos', JSON.stringify(carritoProductos)); 
        renderizarCarrito();

    })

});

const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.querySelector('#signup-name').value;
    const email = document.querySelector('#signup-email').value;
    const password = document.querySelector('#signup-password').value;

    const usuario = new Object(); 
    usuario.nombre = nombre;
    usuario.email = email;
    auth
        .createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            guardarObjetosDB(usuario, 'usuarios');
            signupForm.reset();
            $('#signup-modal').modal('hide')
            console.log('sign up')
        })
});

const signinForm = document.querySelector('#login-form');
signinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.querySelector('#login-email').value;
    const password = document.querySelector('#login-password').value;
    auth
        .signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            signinForm.reset();
            $('#signin-modal').modal('hide')
            console.log('sign in')
        })

});
const logout = document.querySelector('#pills-logout-tab');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        console.log('sign out')
    });

});

auth.onAuthStateChanged(user => {

    if (user) {
        mostrarIconos(user);
        buscarUsuario(user.email, 'usuarios');

    } else {
        nombreUsuario.innerHTML = '';
        mostrarIconos(user);
    }

});

const buscarUsuario = async (email, coleccion) => {
    await db.collection(coleccion).onSnapshot((onSnapshot) => {
        const data = onSnapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
        const usuarioDB = data.find(usuario => usuario.email === email);
        nombreUsuario.innerHTML = ` ${usuarioDB.nombre}`;
        const usuario = usuarioDB.nombre
        const correo = usuarioDB.email
        const datosUsuario = crearObjetoDatos(usuario, correo);
        return usuarioDB;
    })
};

const crearObjetoDatos = (nombre, email) => {
    class Carrito {
        constructor(nombre, email) {  
            this.nombre = nombre;
            this.email = email;
        }
    }
    const datosObjeto = new Carrito(nombre, email);
    return datosObjeto;
}