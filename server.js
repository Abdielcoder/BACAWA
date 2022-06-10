const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const multer = require('multer');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const passport = require('passport');
const io = require('socket.io')(server);
const mercadopago = require('mercadopago');


/*
* MERCADO PAGO CONFIGUARCION
*/
mercadopago.configure({
    access_token: 'TEST-6465507329858608-031923-46b71ba7d0e8e1699308e4744fe7e46d-802791075'
});

/*
* SOCKETS
*/
const orderDeliverySocket = require('./sockets/orders_delivery_socket');

/**
 * ROUTES
 * 
 */
const users = require('./routes/userRoutes');
const categories = require('./routes/categoriesRoutes');
const products = require('./routes/productsRoutes');
const address = require('./routes/addressRoutes');
const orders = require('./routes/ordersRoutes');
const cars = require('./routes/carsRoutes');
const mercadoPagoRoutes = require('./routes/mercadoPagoRoutes');


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const upload = multer({
    storage: multer.memoryStorage()
})






app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.disable('x-powered-by');


const port = process.env.PORT || 3000;
app.set('port', port);

// LLAMAR A LOS SOCKETS
orderDeliverySocket(io);


/**
 * CALL ROUTES
 * 
 */
users(app, upload);
categories(app);
address(app);
orders(app);
products(app, upload);
cars(app,upload);
mercadoPagoRoutes(app);

server.listen(3333, '172.31.85.225' || 'localhost', function() {
    console.log('Application NODE ' + process.pid + 'Inicias...');
});

//ERROR HANDLER
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});

module.exports = {
    app: app,
    server: server
}
