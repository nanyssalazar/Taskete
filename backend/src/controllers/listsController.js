const List = require('../models/list');
require('dotenv').config();

module.exports = {
  //get all list that have the same author
  async getAllLists(req, res) {
    //make sure to send the id stringified
    const { author } = req.body;
    // const lists = await List.aggregate([
    //   { $match: { author: { id: userId } } },
    // ]);
    const lists = await List.find({ author: author });
    if (lists) {
      return res.json(lists);
    } else {
      res.json({});
    }
  },
  async createList(req, res) {
    console.log(req.body);
    const { title, dateCreated, lastEdited, author } = req.body;
    const list = await List.create({
      title,
      dateCreated,
      lastEdited,
      author,
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
