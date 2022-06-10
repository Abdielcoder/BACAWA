const CarsControllers = require('../controllers/carsControllers');
const passport = require('passport');

module.exports = (app, upload) => {

    /*
    * GET All cars
    */
   app.get('/api/cars/getAll',  CarsControllers.getAll);

    /*
    * Create Cars
    */
   app.post('/api/cars/create',  CarsControllers.create);
    /*
    * Create Car With Image
    */
   app.post('/api/cars/createwimage', upload.array('image', 1), CarsControllers.registerWithImage);
  
   /*
    * GET Cars By User
    */
   app.get('/api/cars/findByUser/:id_user',  CarsControllers.findByUser);

   
   /*
    * DELETE Cars By User
    */
   app.delete('/api/cars/delete/car/:id',  CarsControllers.deleteUserCar);

}