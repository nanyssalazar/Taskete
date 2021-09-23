const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  description: String,
  dateCreated: { type: Date, default: Date.now },
  lastEdited: { type: Date, default: Date.now },
  status: String,
  colorValue: String,
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
