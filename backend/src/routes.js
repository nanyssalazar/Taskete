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
routes.post('/lists', ListsController.createList);
routes.get('/lists/:authorId', ListsController.getAllLists);
routes.get('/list/:listId', ListsController.getListById);
routes.delete('/lists/:listId', ListsController.deleteList);
//call this route when making a cascade list deletion
routes.delete('/lists/tasks/:listId', TasksController.deleteTasksByListId);

// TASKS
routes.post('/tasks', TasksController.createTask);
routes.get('/tasks/:listId', TasksController.getAllTasks);
routes.put('/tasks/:taskId', TasksController.updateTask);
routes.delete('/tasks/:taskId', TasksController.deleteTask);

module.exports = routes;
