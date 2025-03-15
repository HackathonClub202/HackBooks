const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    // required: true,
    default: '', // Provide a default value
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  subscription: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('User', UserSchema);