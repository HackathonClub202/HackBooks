const express = require('express');
const passport = require('passport');
const { loginSuccess, logout } = require('../controllers/authController');
// routes/authRoutes.js
// const passport = require('passport');
const { adminLogin } = require('../controllers/authController');


const router = express.Router();

router.post('/admin/login', adminLogin);
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/dashboard'); // Redirect to frontend
});

router.get('/logout', logout);

router.get('/login/success', loginSuccess);



module.exports = router;
