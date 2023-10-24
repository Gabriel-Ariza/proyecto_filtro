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
console.log(JSON.parse(localStorage.getItem('users')))


import { reiniciarAnimacion } from './utilidades.js';

function crearTarjeta(cliente) {
    let tarjeta = document.createRange().createContextualFragment(
        `
        <div class="tarjetas">
            <div class="contenedor_imagen">
                <img src="../usuario.png" alt="usuario" class="imagen">
            </div>
            <div class="contenedor_texto">
                <p><span class="txt">nombre: </span>${cliente.nombres}</p>
                <p><span class="txt">apellido: </span>${cliente.apellidos}</p>
                <p><span class="txt">ID: </span>${cliente.id}</p>
                <p><span class="txt">cel: </span>${cliente.telefono}</p>
                <p><span class="txt">email: </span>${cliente.email}</p>
                <p><span class="txt">nacimiento: </span>${cliente.fechaNacimiento}</p>
                <p><span class="txt">nacionalidad: </span>${cliente.nacionalidad}</p>
            </div>
        </div>
        `    
    )
    let div_padre = document.getElementById("clientes");
    div_padre.append(tarjeta)
}

class Cliente {
    constructor(id, nombres, apellidos, telefono, email, fechaNacimiento, nacionalidad) {
        this.id = id;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.telefono = telefono;
        this.email = email;
        this.fechaNacimiento = fechaNacimiento;
        this.nacionalidad = nacionalidad;
    }
}

class TiendaClientes {
    constructor() {
        /* this.listaDeClientes = []; */
        this.listaDeClientes = this.obtenerClientesDesdeLocalStorage() || [];
    }

/*     agregarCliente(cliente) {
        this.listaDeClientes.push(cliente);
        this.actualizarVista();
    } */
    agregarCliente(cliente) {        
        this.listaDeClientes.push(cliente);
        this.actualizarVista();
        this.guardarClientesEnLocalStorage();
        console.log('Cliente agregado:\n', cliente);
        console.log('Clientes en Local Storage:\n', this.obtenerClientesDesdeLocalStorage());
        
    }
    
    guardarClientesEnLocalStorage() {
        localStorage.setItem('clientes', JSON.stringify(this.listaDeClientes));
    }
    obtenerClientesDesdeLocalStorage() {
        return JSON.parse(localStorage.getItem('clientes')) || [];
    }

    modificarClientePorID(id) {
        const cliente = this.listaDeClientes.find(cliente => cliente.id === id);
        if (cliente) {
            const clienteAntiguo = { ...cliente };
            // Utiliza prompts para actualizar los datos (excepto el ID)
            cliente.nombres = prompt("Nuevos nombres:", cliente.nombres);
            cliente.apellidos = prompt("Nuevos apellidos:", cliente.apellidos);
            cliente.telefono = prompt("Nuevo teléfono:", cliente.telefono);
            cliente.email = prompt("Nuevo email:", cliente.email);
            cliente.fechaNacimiento = prompt("Nueva fecha de nacimiento:", cliente.fechaNacimiento);
            cliente.nacionalidad = prompt("Nueva nacionalidad:", cliente.nacionalidad);
    
            this.actualizarVista();
            this.guardarClientesEnLocalStorage();
            console.log('Cliente modificado - Antes:', clienteAntiguo);
            console.log('Cliente modificado - Después:', cliente);
            console.log('Clientes en Local Storage:', this.obtenerClientesDesdeLocalStorage());    
            reiniciarAnimacion(2000);
        }
    }
    eliminarClientePorID(id) {
        const index = this.listaDeClientes.findIndex(cliente => cliente.id === id);
        if (index !== -1) {

            this.listaDeClientes.splice(index, 1);
            this.actualizarVista();
            this.guardarClientesEnLocalStorage();
            console.log('Clientes en Local Storage:\n', this.obtenerClientesDesdeLocalStorage());
            reiniciarAnimacion(2000);
        }
    }

    buscarClientes(query) {
        query = query.toLowerCase();
        const clientesContainer = document.getElementById('clientes');
    
        const clienteEncontrado = this.listaDeClientes.find(cliente => {
            const nombreCompleto = `${cliente.nombres}`.toLowerCase();
            return (
                cliente.id.toLowerCase().includes(query) ||
                nombreCompleto.includes(query) ||
                cliente.apellidos.toLowerCase().includes(query)
            );
        });
        
    
        if(query.trim() === '') {
            console.log(this.listaDeClientes)
            this.actualizarVista();
        }
        else if(clienteEncontrado) {
            clientesContainer.innerHTML = '';
            crearTarjeta(clienteEncontrado);
            reiniciarAnimacion(2000);
        }
    }
    

    actualizarVista() {
        const clientesContainer = document.getElementById('clientes');
        clientesContainer.innerHTML = '';
        this.listaDeClientes.forEach(cliente => {
        crearTarjeta(cliente);
    });
    }
}

const archived_clients = JSON.parse(localStorage.getItem('clientes')) || [];
const tiendaClientes = new TiendaClientes(archived_clients);
/* const tiendaClientes = new TiendaClientes(); */

// Ejemplo de uso:
/* const hola = new Cliente("1099738122", "Jose", "Plata", "3223426718", "jgpa2016@gmail.com",
    "26/01/2006", "colombiano");
const hola2 = new Cliente("9046830553", "Carlos", "Perez", "642952853", "pepitoperez@gmail.com",
"16/05/2002", "veneco");
const hola3 = new Cliente("6886433677", "elver", "rincon", "235775356", "elvercrack@hotmail.com",
"19/08/1990", "suizo");
const hola4 = new Cliente("8579435525", "juan", "pintoso", "642952853", "merapinta@outlook.es",
"11/09/2001", "nerdental");
tiendaClientes.agregarCliente(hola);
tiendaClientes.agregarCliente(hola2);
tiendaClientes.agregarCliente(hola3);
tiendaClientes.agregarCliente(hola4); */

document.addEventListener('DOMContentLoaded', function () {
    tiendaClientes.actualizarVista();
    const modalRegistro = document.getElementById('modalRegistro');
    const abrirModalRegistro = document.getElementById('abrirModalRegistro');
    const botonX = document.getElementById('boton_x');
    const formularioRegistro = document.getElementById('formularioRegistro');
    const botonEliminar = document.getElementById('eliminarCliente');
    const botonModificar = document.getElementById('modificarCliente');

    abrirModalRegistro.addEventListener('click', function () {
        modalRegistro.style.display = 'flex';
    });
    botonX.addEventListener('click', function () {
        modalRegistro.style.display = 'none';
    });

    formularioRegistro.addEventListener('submit', function (e) {
        e.preventDefault();

        const id = document.getElementById('id').value;
        const nombres = document.getElementById('nombres').value;
        const apellidos = document.getElementById('apellidos').value;
        const telefono = document.getElementById('telefono').value;
        const email = document.getElementById('email').value;
        const fechaNacimiento = document.getElementById('fechaNacimiento').value;
        const nacionalidad = document.getElementById('nacionalidad').value;

        const nuevoCliente = new Cliente(id, nombres, apellidos, telefono, email, fechaNacimiento, nacionalidad);
        tiendaClientes.agregarCliente(nuevoCliente);
        formularioRegistro.reset();
        modalRegistro.style.display = 'none';
    });

    botonEliminar.addEventListener('click', function () {
/*         const nombreCompleto = prompt("Ingrese el nombre completo del cliente a eliminar:");
        tiendaClientes.eliminarClientePorNombre(nombreCompleto); */
        const id = prompt("Ingrese el ID del cliente a eliminar:");
        tiendaClientes.eliminarClientePorID(id);
    });

    botonModificar.addEventListener('click', function () {
/*         const nombreCompleto = prompt("Ingrese el nombre completo del cliente a modificar:");
        tiendaClientes.modificarClientePorNombre(nombreCompleto); */
        const id = prompt("Ingrese el ID del cliente a modificar:");
        tiendaClientes.modificarClientePorID(id);
    });

    const botonBuscar = document.getElementById('buscarClientes');
    botonBuscar.addEventListener('click', function () {
        const query = document.getElementById('search').value;
        tiendaClientes.buscarClientes(query);
    });    
});