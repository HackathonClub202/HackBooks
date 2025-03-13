// models/Subscription.js
const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  mobile: String,
});

module.exports = mongoose.model("Subscription", subscriptionSchema);
