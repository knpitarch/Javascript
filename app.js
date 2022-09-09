let listadoComics = document.querySelector('#listado-comics');

const renderizarComics = (comics) => {  // Función que renderiza los comics en el DOM
    const { title, thumbnail } = comics;
    const { path, extension } = thumbnail;
    const urlImagen = `${path}.${extension}`;
    const tarjeta = document.createElement('div');
    tarjeta.classList.add('col-md-3');
    tarjeta.innerHTML = '';
    tarjeta.innerHTML = `
    <div class="card mb-3 mt-3 mr-3 ml-3"SS >
        <img src="${urlImagen}" class="card-img-top" alt="...">
        <div class="card-body">
            <h4 class="card-title text-center">${title}</h4>
        </div>
    </div>`;
    listadoComics.appendChild(tarjeta); // Agrega la tarjeta al DOM
}

$('.btn-traer-comics').on('click', () => { // Espera a que se haga click en el botón.

    $(document).ready(() => {
        $('#listado-comics').css('background-color', 'white');
        $('#listado-comics').empty(); // Limpia el contenido del DOM
        $('#listado-comics').hide();
        $.ajax({ // Hace una petición a la API
            method: 'GET',
            url: 'db.json',
            success: (json) => { // Si la petición se hace correctamente, se ejecuta la función.
                json.forEach((comics) => { // Recorre el array de comics.
                    renderizarComics(comics); // Renderiza cada uno de los comics.
                    $('.titulo').fadeIn(1000)
                    $('#listado-comics').fadeIn(2000, () => {

                        $('#listado-comics').fadeOut(2000, () => {
                            $('#listado-comics').fadeIn(2000, () => {

                                $('#listado-comics').css('background-color', 'black');

                            });
                        });;


                    });
                })
            }
        })
    })

});