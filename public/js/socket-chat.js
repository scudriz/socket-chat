var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre/sala es necesario');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}

socket.on('connect', function() {
    console.log('Conectado al servidor');
    socket.emit('entrarChat', usuario, function(resp) {
        console.log(resp);
    });


});


// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Escuchar información
socket.on('crearMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});

//socket.emit('crearMensaje', {
//    mensaje: 'El mensaje que quiero enviar'
//}, (resp) => {
//    console.log(resp);
//});


// Escuchar la lista de todos los usarios si existe evento de conexión o desconexión
socket.on('listaPersonas', function(mensaje) {
    console.log(mensaje);
});

// mensajes privados.abs

socket.on('mensajePrivado', function(mensaje) {
    console.log('Mensaje Privado: ', mensaje);
});