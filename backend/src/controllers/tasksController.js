const Task = require('../models/task');
require('dotenv').config();

module.exports = {
  //get all task from one list
  async getAllTasks(req, res) {
    const { listId } = req.params;
    //const listId = list._id;
    // const tasks = await Task.aggregate([{ $match: { list: { id: listId } } }]);
    const tasks = await Task.find({ linkedList: listId });
    if (tasks) {
      return res.json(tasks);
    } else {
      res.json({});
    }
  },
  async createTask(req, res) {
    console.log(req.body);
    const { description, dateCreated, lastEdited, status, linkedList } =
      req.body;
    //linkedList refers to the list which it links to
    const task = await Task.create({
      description,
      dateCreated,
      lastEdited,
      status,
      linkedList,
    });
    console.log(task);
    return res.json(task);
  },
  async deleteTask(req, res) {
    const { taskId } = req.params;
    try {
      await Task.findByIdAndDelete(taskId);
      return res.status(204).json({ message: 'Task Deleted' });
    } catch (e) {
      return res.status(200).json({ message: 'Task not found.' });
    }
  },
};
