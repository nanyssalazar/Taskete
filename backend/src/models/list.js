const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
  title: String,
  dateCreated: Date,
  lastEdited: Date,
  //relacionar con lists
  author: String,
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
