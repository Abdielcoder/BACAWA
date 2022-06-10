module.exports = (io) => {

    const orderDeliveryNamespace = io.of('/orders/delivery');
    const orderAsigned = io.of('/orders/asigned');
    const orderStatus = io.of('/orders/status');

    orderDeliveryNamespace.on('connection', function(socket) {

        console.log('USUARIO CONECTADO AL NAMESPACE /orders/delivery');

        socket.on('position', function(data) {
            console.log(`EMITIO ${JSON.stringify(data)}`);
            orderDeliveryNamespace.emit(`position/${data.id_order}`, { lat: data.lat, lng: data.lng  });
        });

        socket.on('disconnect', function(data) {
            console.log('USUARIO DESCONECTADO');
        });
    });


    orderAsigned.on('connection', function(socket) {

        console.log('USUARIO CONECTADO AL NAMESPACE /orders/asigned');

        socket.on('idOrder', function(data) {
            console.log(`EMITIO ID ${JSON.stringify(data)}`);
            orderAsigned.emit(`position/${data.id_order}`, { idLavador: data.idLavador});
        });

        socket.on('disconnect', function(data) {
            console.log('USUARIO DESCONECTADO');
        });
    });


	

    orderStatus.on('connection', function(socket) {

        console.log('USUARIO CONECTADO AL NAMESPACE /orders/status');

        socket.on('status', function(data) {
            console.log(`EMITIO LA DATA DE LA ORDER Y EL STATUS ${JSON.stringify(data)}`);
            orderStatus.emit(`status/${data.id_order}`, { statusOrder: data.statusOrder});
        });

        socket.on('disconnect', function(data) {
            console.log('USUARIO DESCONECTADO del STATUS');
        });
    });



}
