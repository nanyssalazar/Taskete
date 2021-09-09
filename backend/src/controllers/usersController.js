const User = require('../models/user');
require('dotenv').config();

module.exports = {
  async getAllUsers(req, res) {
    const users = await User.find({});
    if (users) {
      return res.json(users);
    } else {
      res.json({});
    }
  },
  async createUser(req, res) {
    console.log(req.body);
    const { givenName, familyName, email, googleId, imageUrl, name } = req.body;
    const user = await User.find({
      givenName: givenName,
      familyName: familyName,
      email: email,
      googleId: googleId,
      imageUrl: imageUrl,
      name: name,
    });
    console.log(user);
    // if user doesnt exits in DB
    if (user.length === 0) {
      const newUser = await User.create({
        givenName,
        familyName,
        email,
        googleId,
        imageUrl,
        name,
      });
      console.log('Nuevo usuario registrado');
      console.log(newUser);
      return res.json(newUser);
    } else {
      console.log('Usuario ya registrado');
      console.log(user);
      return res.json(user);
    }
  },
  async getUserById(req, res) {
    const { userId } = req.params;
    console.log(userId);
    const user = await User.findById(userId);
    if (user) {
      return res.json(user);
    } else {
      return res.json({ message: 'User not found.' });
    }
  },
  async deleteUser(req, res) {
    const { userId } = req.params;
    try {
      await User.findByIdAndDelete(userId);
      return res.status(204).json({ message: 'User Deleted' });
    } catch (e) {
      return res.status(200).json({ message: 'User not found.' });
    }
  },
};
