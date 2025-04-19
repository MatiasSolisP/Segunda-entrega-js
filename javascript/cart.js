const contenedorTarjetas = document.getElementById("cart-container");
const cantidadElement = document.getElementById("cantidad");
const precioElement = document.getElementById("precio");
const carritoVacioElement = document.getElementById("carrito-vacio");
const totalesContainer = document.getElementById("totales");

function crearTarjetasProductosCarrito() {
    contenedorTarjetas.innerHTML = "";
    const productos = JSON.parse(localStorage.getItem(keyLocalstorage));
    if (productos && productos.length > 0) {
        productos.forEach((producto) => {
            const nuevaBebida = document.createElement("div");
            nuevaBebida.classList = "tarjeta-producto";
            nuevaBebida.innerHTML = `
    <img src="./img/productos/${producto.id}.jpg">
    <h3>${producto.nombre}</h3>
    <span>$${producto.precio}</span>
    <div>
    <button>-</button>
    <span class="cantidad">${producto.cantidad}</span>
    <button id="btn-suma">+</button>
    </div>
    `;
            contenedorTarjetas.appendChild(nuevaBebida);
            nuevaBebida
                .getElementsByTagName("button")[0]
                .addEventListener("click", (e) => {
                    const cantidadElement = e.target.parentElement.getElementsByClassName("cantidad")[0];
                    cantidadElement.innerText = restarAlCarrito(producto);
                    crearTarjetasProductosCarrito();
                    actualizarTotales();
                });
            nuevaBebida
                .getElementsByTagName("button")[1]
                .addEventListener("click", (e) => {
                    const cantidadElement = e.target.parentElement.getElementsByClassName("cantidad")[0];
                    cantidadElement.innerText = agregarAlCarrito(producto);
                    actualizarTotales();
                });
        });
    }
    revisarMensajeVacio();
    actualizarTotales();
    actualizarNumeroCarrito();
}

crearTarjetasProductosCarrito();

function actualizarTotales() {
    const productos = JSON.parse(localStorage.getItem(keyLocalstorage));
    let cantidad = 0;
    let precio = 0;
    if (productos && productos.length > 0) {
        productos.forEach((producto) => {
            cantidad += producto.cantidad;
            precio += producto.precio * producto.cantidad;
        });
    }
    cantidadElement.innerText = cantidad;
    precioElement.innerText = precio;
    if (precio === 0) {
        reiniciarCarrito();
        revisarMensajeVacio();
    }
}

document.getElementById("reiniciar").addEventListener("click", () => {
    contenedorTarjetas.innerHTML = "";
    reiniciarCarrito();
    revisarMensajeVacio();
});

function revisarMensajeVacio() {
    const productos = JSON.parse(localStorage.getItem(keyLocalstorage));
    carritoVacioElement.classList.toggle("escondido", productos);
    totalesContainer.classList.toggle("escondido", !productos);
}

document.getElementById("comprar").addEventListener("click", () => {
    contenedorTarjetas.innerHTML = "";
    reiniciarCarrito();
    revisarMensajeVacio();
    Swal.fire({
        title: 'Su compra se ha realizado con éxito!',
        icon: 'success',
        background: 'white',
        toast: 'true',
        showConfirmButton: false,
        html:'<a href="./index.html"><button>Ok</button></a>',
        allowOutsideClick: false,
        allowEscapeKey: false,
        stopKeydownPropagation: false,
    });
});
