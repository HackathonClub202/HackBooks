const mongoose = require('mongoose');

const AllowedUserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
});

module.exports = mongoose.model('AllowedUser', AllowedUserSchema);
