const { io } = require('../server');

const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {
        let nextTicket = ticketControl.siguiente()
        callback(nextTicket);
    });

    //emitir evento "estadoActual"
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimosCuatro: ticketControl.getUltimosCuatro(),
    });

    client.on('atenderTicket', (data, callback) => {

        if( !data.escritorio ){
            return callback({
                err: true,
                message: 'El escritorio es necesario',
            });
        }

        // obtener el ticket actual para atender
        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        //enviar al cliente
        callback(atenderTicket);

        client.broadcast.emit('ultimosCuatro', {
            ultimosCuatro: ticketControl.getUltimosCuatro(),
        });

    });

    // client.on('disconnect', () => {
    //     console.log('Usuario desconectado');
    // });


});