function crearTarjeta(juego) {
    let tarjeta = document.createRange().createContextualFragment(
        `
        <div class="tarjeta_juego">
            <div class="tarjeta_imagen">
                <img src="${juego.imagen}" alt="${juego.titulo}" class="imagen">
            </div>
            <div class="tarjeta_texto">
                <p><span class="txt">nombre: </span>${juego.titulo}</p>
                <p><span class="txt">Año: </span>${juego.año}</p>
                <p><span class="txt">Categoría: </span>${juego.categoria}</p>
                <p><span class="txt">Descripción: </span>${juego.descripcion}</p>
                <p><span class="txt">Precio: </span>${juego.precio}</p>
                <p><span class="txt">Stock: </span>${juego.stock}</p>
                <p><span class="txt">Puntos de Compra: </span>${juego.puntosDeCompra}</p>
            </div>
        </div>
        `
    );
    let div_padre = document.getElementById("juegos");
    div_padre.append(tarjeta);
}

export { crearTarjeta };