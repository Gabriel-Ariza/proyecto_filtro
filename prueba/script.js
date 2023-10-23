class Juego {
    constructor(imagen, titulo, año, categoria ,descripcion, precio, stock, puntosDeCompra) {
        this.imagen = imagen;
        this.titulo = titulo;
        this.año = año;
        this.categoria = categoria;
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
        this.puntosDeCompra = puntosDeCompra;
    }

    comprar() {
        if (this.stock > 0) {
            this.stock--;
            console.log(`Has comprado el juego '${this.titulo}' por $${this.precio}.`);
        } else {
            console.log(`El juego '${this.titulo}' está agotado.`);
        }
    }
}

const tienda = {
    listaDeJuegos: [],

    agregarJuego(juego) {
        this.listaDeJuegos.push(juego);
        console.log(`El juego '${juego.titulo}' ha sido agregado a la tienda.`);
        this.actualizarVista();
    },

    modificarJuego(titulo, nuevoPrecio, nuevoStock) {
        const juego = this.listaDeJuegos.find(juego => juego.titulo === titulo);
        if (juego) {
            juego.precio = nuevoPrecio;
            juego.stock = nuevoStock;
            console.log(`El juego '${juego.titulo}' ha sido modificado.`);
            this.actualizarVista();
        } else {
            console.log(`Juego con el título '${titulo}' no encontrado.`);
        }
    },

    eliminarJuego(titulo) {
        const index = this.listaDeJuegos.findIndex(juego => juego.titulo === titulo);
        if (index !== -1) {
            this.listaDeJuegos.splice(index, 1);
            console.log(`El juego '${titulo}' ha sido eliminado de la tienda.`);
            this.actualizarVista();
        } else {
            console.log(`Juego con el título '${titulo}' no encontrado.`);
        }
    },

    comprarJuego(titulo) {
        const juego = this.listaDeJuegos.find(juego => juego.titulo === titulo);
        if (juego) {
            juego.comprar();
            this.actualizarVista();
        } else {
            console.log(`Juego con el título '${titulo}' no encontrado.`);
        }
    },

    actualizarVista() {
        const juegosContainer = document.getElementById('juegos-container');
        juegosContainer.innerHTML = ''; // Limpiar la lista de juegos

        this.listaDeJuegos.forEach(juego => {
            const juegoDiv = document.createElement('div');
            juegoDiv.classList.add('juego');
            juegoDiv.innerHTML = `
                <img src="${juego.imagen}" alt="${juego.titulo}">
                <h3>${juego.titulo}</h3>
                <p>Año: ${juego.año}</p>
                <p>Categoría: ${juego.categoria}</p>
                <p>Descripción: ${juego.descripcion}</p>
                <p>Precio: $${juego.precio}</p>
                <p>Stock: ${juego.stock}</p>
                <p>Puntos de Compra: ${juego.puntosDeCompra}</p>
            `;
            juegosContainer.appendChild(juegoDiv);
        });
    },
};

// Ejemplo de uso:
const juego1 = new Juego("https://i.redd.it/za3pxrr77px31.jpg", "Call of Dutty black ops 2", 2012, "Accion",
    "Aparece el villano Raul Menendez, que ha secuestrado la infraestructura militar de EE.UU. Usa la tecnología del futuro para salvar al mundo de la aniquilación.",
    25.99, 20, 25);

const juego2 = new Juego("https://fs-prod-cdn.nintendo-europe.com/media/images/10_share_images/games_15/nintendo_switch_4/H2x1_NSwitch_MortalKombat11_image1600w.jpg",
    "Mortal Kombat 11", 2019, "Accion", "Mortal Kombat 11 es la nueva entrega de la violenta y salvaje saga de lucha. Presentará los mejores gráficos de la serie y el gore más descarnado en los llamados Fatality",
    49.99, 10, 40);

tienda.agregarJuego(juego1);
tienda.agregarJuego(juego2);


const crearJuego = () => {
    const imagen = prompt("Ingrese la URL de la imagen del juego:");
    const titulo = prompt("Ingrese el título del juego:");
    const año = prompt("Ingrese el año del juego:");
    const categoria = prompt("Ingrese La categoria del juego:");
    const descripcion = prompt("Ingrese la descripción del juego:");
    const precio = parseFloat(prompt("Ingrese el precio del juego:"));
    const stock = parseInt(prompt("Ingrese la cantidad en stock del juego:"));
    const puntosDeCompra = parseInt(prompt("Ingrese los puntos de compra del juego:"));

    const nuevoJuego = new Juego(imagen, titulo, año, categoria, descripcion, precio, stock, puntosDeCompra);
    tienda.agregarJuego(nuevoJuego);
};

// Función para modificar un juego
const modificarJuego = () => {
    const titulo = prompt("Ingrese el título del juego a modificar:");
    const nuevoPrecio = parseFloat(prompt("Ingrese el nuevo precio del juego:"));
    const nuevoStock = parseInt(prompt("Ingrese el nuevo stock del juego:"));

    tienda.modificarJuego(titulo, nuevoPrecio, nuevoStock);
};

// Función para eliminar un juego
const eliminarJuego = () => {
    const titulo = prompt("Ingrese el título del juego a eliminar:");
    tienda.eliminarJuego(titulo);
};

// Función para comprar un juego
const comprarJuego = () => {
    const titulo = prompt("Ingrese el título del juego a comprar:");
    tienda.comprarJuego(titulo);
};

// Asocia las funciones a los botones
document.getElementById('crearJuego').addEventListener('click', crearJuego);
document.getElementById('modificarJuego').addEventListener('click', modificarJuego);
document.getElementById('eliminarJuego').addEventListener('click', eliminarJuego);
document.getElementById('comprarJuego').addEventListener('click', comprarJuego);

tienda.actualizarVista(); // Actualiza la vista inicial