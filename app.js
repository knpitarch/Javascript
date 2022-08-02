let precioCompra = Number (prompt('Ingresar Monto Producto en $'));
let cantidadCuotas = parseInt(prompt('Elegir Plan de Pago/s \n( 1, 2, 3, 6, 9 y 12 pagos)'));
let precioFinal = 0;

while (parseInt(precioCompra)) {
    switch (cantidadCuotas) {
        case 1: 
            precioFinal = precioCompra;
            mensaje(precioFinal, precioCompra, cantidadCuotas);
            break;
        case 2: 
            precioFinal = precioCompra * 1.0993; 
            mensaje(precioFinal, precioCompra, cantidadCuotas); 
            break;
        case 3: 
            precioFinal = precioCompra * 1.1481; 
            mensaje(precioFinal, precioCompra, cantidadCuotas); 
            break;
        case 6: 
            precioFinal = precioCompra * 1.3024; 
            mensaje(precioFinal, precioCompra, cantidadCuotas); 
            break;
        case 9: 
            precioFinal = precioCompra * 1.5654 
            mensaje(precioFinal, precioCompra, cantidadCuotas); 
            break;
        case 12: 
            precioFinal = precioCompra * 1.7413 
            mensaje(precioFinal, precioCompra, cantidadCuotas); 
            break;
        default:
            alert(`El plan en ${cantidadCuotas} pagos no esta disponible`);
    }       
        precioCompra = Number(prompt('Ingresar Monto Producto en $'));
        cantidadCuotas = parseInt(prompt('Elegir Plan de Pago/s \n( 1, 2, 3, 6, 9 y 12 pagos)'));
        precioFinal = 0;
}

function valorPagos(precio, cuotas ) {
    let precioCuota = 0;
    precioCuota = precio / cuotas;
    return precioCuota.toFixed(2);
}

function intereses(precioFinal, precioCompra) {
    let interes = 0;
    interes = precioFinal - precioCompra;
    return interes;
}

function mensaje(precioFinal, precioCompra, cantidadCuotas) {
    let mensaje = alert(`El precio final a pagar es de $${(precioFinal).toFixed(2)} en ${cantidadCuotas} pago/s de $${valorPagos(precioFinal, cantidadCuotas)} \n+$${(intereses(precioFinal, precioCompra)).toFixed(2)} de interes`); //dentro del mensaje se ejecutan las funciones de calculo de intereses y valor de pagos
    return mensaje;

}