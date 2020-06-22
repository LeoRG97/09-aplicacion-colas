var socket = io();

var smLabel = $('small');

var searchParams = new URLSearchParams( window.location.search );

//evaluar si la URL tiene el parámetro "escritorio"
if ( !searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');

// console.log(escritorio);
$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function(){
    
    socket.emit('atenderTicket', { escritorio: escritorio }, function(res){
        if( res === 'No hay tickets'){
            smLabel.text(res);
            alert(res);
            return;
        }
        smLabel.text('Ticket ' + res.numero);
    });

});