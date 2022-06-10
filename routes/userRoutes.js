const UsersController = require('../controllers/usersController');
const passport = require('passport');

module.exports = (app, upload) => {
    //ALL USERS
  app.get('/api/users/getAll', UsersController.getAll);
    //USER BY ID
  app.get('/api/users/findById/:id', UsersController.findById);
  //  app.get('/api/users/findById/:id',UsersController.findById);
    //REGISTER USER
  app.post('/api/users/create', upload.array('image', 1), UsersController.registerWithImage);

  app.post('/api/users/create/back', UsersController.registerUserBack);
    //LOGIN USER
  app.post('/api/users/login', UsersController.login);
    //UPDATE USERS
  app.put('/api/users/update', upload.array('image', 1), UsersController.update)
  // app.put('/api/users/update', upload.array('image', 1), UsersController.update)
  //LOG OUT
  app.post('/api/users/logout', UsersController.logout);
  //
  app.get('/api/users/findDeliveryMen', UsersController.findDeliveryMen);
  app.get('/api/users/getAdminsNotificationTokens', UsersController.getAdminsNotificationTokens);
  //
  app.put('/api/users/updateNotificationToken', UsersController.updateNotificationToken)

}