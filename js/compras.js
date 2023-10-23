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


const mis_clientes = JSON.parse(localStorage.getItem('users'));
const mis_juegos = JSON.parse(localStorage.getItem('clientes'));
console.log(mis_clientes)
console.log(mis_juegos)


