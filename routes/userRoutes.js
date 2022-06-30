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

//DELETE USER
	
  app.delete('/api/users/delete/:id', UsersController.deleteUser)
//UPDATE USE BACK
  app.put('/api/users/update/data', UsersController.updateUserData)
//FIND ROLE

 app.get('/api/users/findByRole/:id', UsersController.findByRole);
//FIND BY NAME
app.get('/api/users/findByName', UsersController.findByName);
//UPDATE ID ROL
 app.put('/api/users/update/rol', UsersController.updateUserIdRol)
//GET ALL ADDRESS
app.get('/api/users/addressAll', UsersController.addressAll);
//GET ALL CLIENTS
app.get('/api/users/clientAll', UsersController.clientAll);


}
