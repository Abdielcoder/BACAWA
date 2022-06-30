const OrdersController = require('../controllers/ordersController');
const passport = require('passport');

module.exports = (app) => {

    /*
    * GET ROUTES
    */
   app.get('/api/orders/findByStatus/:status',  OrdersController.findByStatus);
   app.get('/api/orders/findByDeliveryAndStatus/:id_delivery/:status',  OrdersController.findByDeliveryAndStatus);
   app.get('/api/orders/findByClientAndStatus/:id_client/:status',  OrdersController.findByClientAndStatus);

    /*
    * POST ROUTES
    */
   app.post('/api/orders/create',  OrdersController.create);
   app.post('/api/orders/create/cash',  OrdersController.createCash);
   /*
   * PUT ROUTES
   */
   app.put('/api/orders/updateToDispatched',  OrdersController.updateToDispatched);
   app.put('/api/orders/updateCancelOrder',  OrdersController.updateCancelOrder);
   app.put('/api/orders/updateToOnTheWay',  OrdersController.updateToOnTheWay);
   app.put('/api/orders/updateToDelivered',  OrdersController.updateToDelivered);
   app.put('/api/orders/updateLatLng',  OrdersController.updateLatLng);
   app.put('/api/orders/updateCancelWash',  OrdersController.updateCancelWash);
//TOTAL COUNT
  app.get('/api/orders/totalCount', OrdersController.totalCount);
}
