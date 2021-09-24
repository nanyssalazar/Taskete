const Task = require('../models/task');
require('dotenv').config();

module.exports = {
  //get all task from one list
  async getAllTasks(req, res) {
    const { listId } = req.params;
    const tasks = await Task.aggregate([
      { $match: { listId: listId } },
      { $sort: { lastEdited: -1 } },
    ]);
    if (tasks) {
      return res.json(tasks);
    } else {
      res.json({});
    }
  },
  async createTask(req, res) {
    console.log(req.body);
    const { title, colorValue, listId } = req.body;
    const status = 'undone';
    //linkedList refers to the list which it links to
    const task = await Task.create({
      title,
      status,
      colorValue,
      listId,
    });
    console.log(task);
    return res.json(task);
  },

  async updateTask(req, res) {
    const { taskId } = req.params;
    try {
      await Task.updateOne({ _id: taskId }, { $set: req.body.headers });
      return res.json({ message: 'Update succesfull' });
    } catch (e) {
      return res.json({ message: 'Could not update' });
    }
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
