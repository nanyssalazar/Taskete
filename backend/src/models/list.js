const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
  title: String,
  dateCreated: { type: Date, default: Date.now },
  lastEdited: { type: Date, default: Date.now },
  //relacionar con lists
  author: String,
  colorValue: String,
  //   author: {
  //     id: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: 'User',
  //     },
  //     name: String,
  //   },
  //relacionar con tasks
  //   tasks: [
  //     {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: 'Task',
  //     },
  //   ],
});

module.exports = mongoose.model('List', ListSchema);
