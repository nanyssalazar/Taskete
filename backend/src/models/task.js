const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  description: String,
  dateCreated: Date,
  lastEdited: Date,
  status: String,
  // relacionar con list
  linkedList: String,
  //   list: {
  //     id: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: 'List',
  //     },
  //     title: String,
  //   },
});

module.exports = mongoose.model('Task', TaskSchema);
