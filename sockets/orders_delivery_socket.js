module.exports = (io) => {

    const orderDeliveryNamespace = io.of('/orders/delivery');
    const orderAsigned = io.of('/orders/asigned');
    const orderStatus = io.of('/orders/status');
    const latLngwasher=io.of('/orders/lat');
    const orderscatch=io.of('/orders/catch');

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
            console.log(`EMITIO STATUS ${JSON.stringify(data)}`);
            orderStatus.emit(`status/${data.id_order}`, { statusOrder: data.statusOrder, lat: data.lat , lng: data.lng, idClient: data.idClient, idAddress: data.idAddress  });
        });

        socket.on('disconnect', function(data) {
            console.log('USUARIO DESCONECTADO del STATUS');
        });
    });

latLngwasher.on('connection', function(socket) {


        console.log('USUARIO CONECTADO  /orders/lat');

        socket.on('lat', function(data) {
            console.log(`EMITIO LA POSICION ${JSON.stringify(data)}`);
            latLngwasher.emit(`lat/${data.id_order}`, { lat: data.lat, lng: data.lng  });
        });

        socket.on('disconnect', function(data) {
            console.log('USUARIO DEJO DE EMITIR COORDENADAS');
        });
    });


orderscatch.on('connection', function(socket) {


        console.log('USUARIO CONECTADO  /orders/catch');

        socket.on('orderscatch', function(data) {
            console.log(`EMITIO LA POSICION ${JSON.stringify(data)}`);
            latLngwasher.emit(`orderscatch`, { idClient: data.client ,idAddress: data.address, lat: data.lat, lng: data.lng  });
        });

        socket.on('disconnect', function(data) {
            console.log('USUARIO DEJO DE EMITIR COORDENADAS');
        });
    });


}

