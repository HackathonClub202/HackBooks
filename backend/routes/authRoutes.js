const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const AllowedUser = require('../models/AllowedUser');

const router = express.Router();
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Configure Google OAuth Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Extract email from Google profile
      const email = profile.emails[0].value;
      // Check if this email is allowed (registered by an admin)
      const allowed = await AllowedUser.findOne({ email });
      if (allowed) {
        return done(null, { email });
      } else {
        return done(null, false, { message: 'Email not allowed' });
      }
    } catch (err) {
      return done(err, null);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Initiate Google OAuth login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback endpoint
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/google-login' }),
  (req, res) => {
    console.log(`Redirect URI: ${req.originalUrl}`);
    const email = req.user.email;
    // Successful authentication: create JWT with role "user" and set in cookie
    const token = jwt.sign({ email: req.user.email, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token, { httpOnly: true });
    // Redirect to user dashboard upon successful login
    res.redirect(`/user-dashboard?email=${encodeURIComponent(email)}`);
});

module.exports = router;
