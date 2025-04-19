const contenedorTarjetas = document.getElementById("productos-container");

function crearTarjetasProductosInicio(productos) {
    productos.forEach(producto => {
        const nuevaBebida = document.createElement("div");
        nuevaBebida.classList = "tarjeta-producto"
        nuevaBebida.innerHTML = `
    <img src="./img/productos/${producto.id}.jpg" >
    <h3>${producto.nombre}</h3>
    <p class="precio">$${producto.precio}</p>
    <button>Agregar al carrito</button>`
        contenedorTarjetas.appendChild(nuevaBebida);
        nuevaBebida.getElementsByTagName("button")[0].addEventListener("click", () => agregarAlCarrito(producto))
    });
}
crearTarjetasProductosInicio(bebidas);


(async () => {
    const { value: accept } = await Swal.fire({
        title: "Venta a mayores de 18 años.",
        input: "checkbox",
        inputValue: 1,
        inputPlaceholder: 'Acepto ser mayor de edad. ',
        confirmButtonText: 'Continuar&nbsp;<i class="fa fa-arrow-right"></i>',
        inputValidator: (result) => {
            return !result && "Debes tener más de 18 años para comprar.";
        },
        allowOutsideClick: false,
        allowEscapeKey: false,
        stopKeydownPropagation: false,
    });
    if (accept) {
        Swal.fire("Bienvenido a Pari!");
    }
})()





