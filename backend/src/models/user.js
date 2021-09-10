const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  givenName: String,
  familyName: String,
  email: String,
  googleId: String,
  imageUrl: String,
  name: String,
});

module.exports = mongoose.model('User', UserSchema);
