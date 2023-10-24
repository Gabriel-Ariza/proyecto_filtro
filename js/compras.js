const user = JSON.parse(localStorage.getItem('login_success')) || false

if(!user){
    window.location.href = 'login.html'
} else {
        let username = document.getElementById('name_display');
        username.textContent = user.name;
        console.log(localStorage.getItem('login_success'))
}
const logout = document.getElementById('salir_cuenta')
logout.addEventListener('click', ()=> {
    alert('Hasta pronto!')
    localStorage.removeItem('login_success')
    window.location.href = 'login.html'
})


const mis_clientes = JSON.parse(localStorage.getItem('clientes'));
const mis_juegos = JSON.parse(localStorage.getItem('juegos'));
console.log(mis_clientes)
console.log(mis_juegos)

import { reiniciarAnimacion } from "./utilidades.js";


function crearTarjeta(juego) {
    let div_padre = document.getElementById("container_juegos");
    let tarjeta = document.createRange().createContextualFragment(
        `
        <div class="tarjeta_juego">
            <div class="contenedor_imagen">
                <img src="${juego.imagen}" alt="${juego.titulo}">
            </div>
            <div class="contenedor_texto">
                <p>${juego.titulo}</p>
                <p>${juego.año}</p>
                <p>${juego.categoria}</p>
                <p>stock: ${juego.stock}</p>
                <p>puntos: ${juego.puntosDeCompra}</p>
            </div>
        </div>
        `
    );
    const contenedorTexto = tarjeta.querySelector('.contenedor_texto');
    const botonComprar = document.createElement('button');
    botonComprar.className = 'comprar_juego';
    botonComprar.textContent = 'Comprar';

    botonComprar.addEventListener('click', () => {
        const juegoComprado = { ...juego };

        const modal = document.getElementById('modal_tabla');
        modal.style.display = 'flex';

        let tabla_padre = document.getElementById("papa_clientes");
        
        // Limpiar el contenido de "papa_clientes" antes de agregar los nuevos botones
        tabla_padre.innerHTML = '';

        mis_clientes.forEach(cliente => {
            let tarjeta = document.createRange().createContextualFragment(
                `
                <div class="ordenacion">
                    <p>${cliente.nombres} ${cliente.apellidos}</p>
                </div>
                `
            );
            let divOrdenacion = tarjeta.querySelector('.ordenacion');
    
            const botonAnadir = document.createElement('button');
            botonAnadir.className = 'cocoloco';
            botonAnadir.textContent = 'añadir';
            botonAnadir.addEventListener('click', () => {
                // Verificar si el cliente ya tiene una lista de juegos o crearla si no existe
                if (!cliente.juegos) {
                    cliente.juegos = [];
                }
                // Agregar el juego completo a la lista de juegos del cliente
                cliente.juegos.push(juegoComprado);

                // Mostrar al cliente con todas sus propiedades en la consola
                console.log(cliente);
                modal.style.display = 'none';
                reiniciarAnimacion(2000)
            });
    
            divOrdenacion.appendChild(botonAnadir);
            tabla_padre.append(tarjeta);
        });

        let boton_x = document.getElementById('cerrar_x');
        boton_x.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    });

    contenedorTexto.appendChild(botonComprar);
    div_padre.append(tarjeta);
}

function cargarVista() {
    const juegosContainer = document.getElementById('container_juegos');
    juegosContainer.innerHTML = '';

    mis_juegos.forEach(juego => {
        crearTarjeta(juego);
    });
}
cargarVista();