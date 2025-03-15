const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');

const loginSuccess = (req, res) => {
    if (req.user) {
      res.status(200).json({
        success: true,
        user: req.user,
      });
    } else {
      res.status(403).json({ success: false });
    }
  };
  
  const logout = (req, res) => {
    req.logout((err) => {
      if (err) return res.status(500).send('Logout error');
      res.status(200).send('Logged out');
    });
  };
  const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
      const admin = await Admin.findOne({ email });
      if (!admin || !(await bcrypt.compare(password, admin.password))) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  module.exports = { loginSuccess, logout, adminLogin };
  