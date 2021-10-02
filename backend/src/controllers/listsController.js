const List = require('../models/list');
require('dotenv').config();

module.exports = {
  //get all list that have the same author
  async getAllLists(req, res) {
    //make sure to send the id stringified
    const { authorId } = req.params;
    const lists = await List.aggregate([
      { $match: { author: authorId } },
      { $sort: { lastEdited: -1 } },
    ]);
    if (lists) {
      return res.json(lists);
    } else {
      res.json({});
    }
  },
  async getListById(req, res) {
    const { listId } = req.params;
    console.log(listId);
    // only returns the title as an object
    const listTitle = await List.findById(listId).select('title -_id');
    if (listTitle) {
      return res.json(listTitle);
    } else {
      return res.json({ message: 'List not found.' });
    }
  },
  async createList(req, res) {
    console.log(req.body);
    const { title, author, colorValue } = req.body;
    const list = await List.create({
      title,
      author,
      colorValue,
    });
    return res.json(list);
  },
  async deleteList(req, res) {
    const { listId } = req.params;
    try {
      await List.findByIdAndDelete(listId);
      return res.status(204).json({ message: 'List Deleted' });
    } catch (e) {
      return res.status(200).json({ message: 'List not found.' });
    }
  },
};
