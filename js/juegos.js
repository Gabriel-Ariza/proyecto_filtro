const user = JSON.parse(localStorage.getItem('login_success')) || false;

if (!user) {
    window.location.href = 'login.html';
} else {
    let username = document.getElementById('name_display');
    username.textContent = user.name;
}

const logout = document.getElementById('salir_cuenta');

logout.addEventListener('click', () => {
    alert('Hasta pronto!');+
    localStorage.removeItem('login_success');
    window.location.href = 'login.html';
});
console.log(JSON.parse(localStorage.getItem('users')));

import { crearTarjeta } from "./creartarjeta.js";

class Juego {
    constructor(imagen, titulo, año, categoria, descripcion, precio, stock, puntosDeCompra) {
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

class TiendaJuegos {
    constructor() {
        //this.listaDeJuegos = [];
        this.listaDeJuegos = this.obtenerJuegosDesdeLocalStorage() || [];
    }

    agregarJuego(juego) {
        this.listaDeJuegos.push(juego);
        this.actualizarVista();
        this.guardarJuegosEnLocalStorage();
        console.log(`El juego '${juego.titulo}' ha sido agregado a la tienda.`);
    }
    
    guardarJuegosEnLocalStorage() {
        localStorage.setItem('juegos', JSON.stringify(this.listaDeJuegos));
    }
    obtenerJuegosDesdeLocalStorage() {
        return JSON.parse(localStorage.getItem('juegos')) || [];
    }


    modificarJuego(titulo, nuevoPrecio, nuevoStock, nuevosPuntos) {
        const juego = this.listaDeJuegos.find(juego => juego.titulo === titulo);
        if (juego) {
            juego.precio = nuevoPrecio;
            juego.stock = nuevoStock;
            juego.puntosDeCompra = nuevosPuntos;
            this.actualizarVista();
            this.guardarJuegosEnLocalStorage();
            console.log(`El juego '${juego.titulo}' ha sido modificado.`);
        } else {
            console.log(`Juego con el título '${titulo}' no encontrado.`);
        }
    }

    eliminarJuego(titulo) {
        const index = this.listaDeJuegos.findIndex(juego => juego.titulo === titulo);
        if (index !== -1) {
            this.listaDeJuegos.splice(index, 1);
            this.actualizarVista();
            this.guardarClientesEnLocalStorage();
            console.log(`El juego '${titulo}' ha sido eliminado de la tienda.`);
        } else {
            console.log(`Juego con el título '${titulo}' no encontrado.`);
        }
    }

    comprarJuego(titulo) {
        const juego = this.listaDeJuegos.find(juego => juego.titulo === titulo);
        if (juego) {
            juego.comprar();
            this.actualizarVista();
        } else {
            console.log(`Juego con el título '${titulo}' no encontrado.`);
        }
    }

    actualizarVista() {
        const juegosContainer = document.getElementById('juegos');
        juegosContainer.innerHTML = ''; // Limpiar la lista de juegos
        this.listaDeJuegos.forEach(juego => {
            crearTarjeta(juego);
        });
    }
}

const archived_games = JSON.parse(localStorage.getItem('clientes')) || [];
const tiendaJuegos = new TiendaJuegos(archived_games);

/*
const juego1 = new Juego("https://i.redd.it/za3pxrr77px31.jpg", "Call of Duty: Black Ops 2", 2012, "Acción",
    "Aparece el villano Raul Menendez, que ha secuestrado la infraestructura militar de EE.UU. Usa la tecnología del futuro para salvar al mundo de la aniquilación.",
    25.99, 20, 25);
const juego2 = new Juego("https://fs-prod-cdn.nintendo-europe.com/media/images/10_share_images/games_15/nintendo_switch_4/H2x1_NSwitch_MortalKombat11_image1600w.jpg",
    "Mortal Kombat 11", 2019, "Acción", "Mortal Kombat 11 es la nueva entrega de la violenta y salvaje saga de lucha. Presentará los mejores gráficos de la serie y el gore más descarnado en los llamados Fatality",
    49.99, 10, 40);
const juego3 = new Juego("https://i.blogs.es/5ccfad/minecraft1/1366_2000.jpeg", "Minecraft", 2011, "Aventura", "Explora mundos generados al azar y construye cosas increíbles, desde la más humilde de las casas hasta el más majestuoso de los castillos",
    29.99, 60, 15);
tiendaJuegos.agregarJuego(juego1);
tiendaJuegos.agregarJuego(juego2);
tiendaJuegos.agregarJuego(juego3); */


const crearJuego = () => {
    const imagen = prompt("Ingrese la URL de la imagen del juego:");
    const titulo = prompt("Ingrese el título del juego:");
    const año = prompt("Ingrese el año del juego:");
    const categoria = prompt("Ingrese la categoría del juego:");
    const descripcion = prompt("Ingrese la descripción del juego:");
    const precio = parseFloat(prompt("Ingrese el precio del juego:"));
    const stock = parseInt(prompt("Ingrese la cantidad en stock del juego:"));
    const puntosDeCompra = parseInt(prompt("Ingrese los puntos de compra del juego:"));

    const nuevoJuego = new Juego(imagen, titulo, año, categoria, descripcion, precio, stock, puntosDeCompra);
    tiendaJuegos.agregarJuego(nuevoJuego);
};

// Función para modificar un juego
const modificarJuego = () => {
    const titulo = prompt("Ingrese el título del juego a modificar:");
    const nuevoPrecio = parseFloat(prompt("Ingrese el nuevo precio del juego:"));
    const nuevoStock = parseInt(prompt("Ingrese el nuevo stock del juego:"));
    const nuevosPuntos = parseInt(prompt("Ingrese Los nuevos puntos del juego:"));

    tiendaJuegos.modificarJuego(titulo, nuevoPrecio, nuevoStock, nuevosPuntos);
};

// Función para eliminar un juego
const eliminarJuego = () => {
    const titulo = prompt("Ingrese el título del juego a eliminar:");
    tiendaJuegos.eliminarJuego(titulo);
};

// Función para comprar un juego
const comprarJuego = () => {
    const titulo = prompt("Ingrese el título del juego a comprar:");
    tiendaJuegos.comprarJuego(titulo);
};

// Asignar eventos a los botones del HTML
document.getElementById('eliminarJuego').addEventListener('click', eliminarJuego);
document.getElementById('modificarJuego').addEventListener('click', modificarJuego);
document.getElementById('abrirModalJuego').addEventListener('click', crearJuego);
/* document.getElementById('comprarJuego').addEventListener('click', comprarJuego); */

// Actualizar la vista inicial
tiendaJuegos.actualizarVista();
