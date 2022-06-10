const AddressController = require('../controllers/addressController');
const passport = require('passport');

module.exports = (app) => {

    /*
    * GET address
    */
   app.get('/api/address/findByUser/:id_user',  AddressController.findByUser);

    /*
    * POST address
    */
   app.post('/api/address/create',  AddressController.create);
}