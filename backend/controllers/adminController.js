const User = require('../models/User');

// Fetch all subscriptions
const getAllSubscriptions = async (req, res) => {
  try {
    const users = await User.find({ subscription: true }).select('-googleId');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new subscription
const addSubscription = async (req, res) => {
  const { email, name, mobile } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists!' });
    }

    const newUser = new User({
      name,
      email,
      subscription: true,
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a subscription
const deleteSubscription = async (req, res) => {
  const { email } = req.params;
  try {
    await User.findOneAndDelete({ email });
    res.status(200).json({ message: 'User deleted successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllSubscriptions, addSubscription, deleteSubscription };
