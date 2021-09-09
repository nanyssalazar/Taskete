const express = require('express');
const routes = express.Router();
const UsersController = require('./controllers/usersController');

routes.get('/', (req, res) => {
  res.send({ status: 200, message: 'CONNECTED!' });
});

// USERS
routes.get('/users', UsersController.getAllUsers);
routes.post('/users', UsersController.createUser);
routes.get('/users/:userId', UsersController.getUserById);
routes.delete('/users/:userId', UsersController.deleteUser);

module.exports = routes;
