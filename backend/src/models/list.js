const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
  title: String,
  dateCreated: { type: Date, default: Date.now },
  lastEdited: { type: Date, default: Date.now },
  //relacionar con lists
  author: String,
  colorValue: String,
});

module.exports = mongoose.model('List', ListSchema);
