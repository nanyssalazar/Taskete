const express = require('express');
const routes = express.Router();
const UsersController = require('./controllers/usersController');
const ListsController = require('./controllers/listsController');
const TasksController = require('./controllers/tasksController');

routes.get('/', (req, res) => {
  res.send({ status: 200, message: 'CONNECTED!' });
});

// USERS
routes.get('/users', UsersController.getAllUsers);
routes.post('/users', UsersController.createUser);
routes.get('/users/:userId', UsersController.getUserById);
routes.delete('/users/:userId', UsersController.deleteUser);

// LISTS
routes.get('/lists', ListsController.getAllLists);
routes.post('/lists', ListsController.createList);
routes.delete('/lists/:listId', ListsController.deleteList);

// TASKS
routes.get('/tasks', TasksController.getAllTasks);
routes.post('/tasks', TasksController.createTask);
routes.delete('/tasks/:taskId', TasksController.deleteTask);

module.exports = routes;
