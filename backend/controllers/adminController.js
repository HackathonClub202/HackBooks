const User = require('../models/User');
// controllers/adminController.js
const csv = require('csv-parser');
const fs = require('fs');
const Subscription = require('../models/Subscription');

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
      mobile,
      subscription: true,
      isGoogleUser: false, // Explicitly set this to false
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.log(err);
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


const uploadBulkUsers = async (req, res) => {
  const { file } = req;
  if (!file) return res.status(400).json({ error: 'File is required' });

  const results = [];
  fs.createReadStream(file.path)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      try {
        await Subscription.insertMany(results.map((r) => ({
          email: r.email,
          name: r.name,
          mobile: r.mobile,
        })));
        res.status(200).json({ message: 'Bulk upload successful' });
      } catch (error) {
        res.status(500).json({ error: 'Error saving data' });
      }
    });
};


module.exports = { getAllSubscriptions, addSubscription, deleteSubscription, uploadBulkUsers };
