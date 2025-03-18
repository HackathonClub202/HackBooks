require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const connectDB = require('./config/db');
const bookRoutes = require('./routes/bookRoutes'); // Import book routes
const path = require('path');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Serve static files from the 'uploads' directory with proper CORS headers
app.use('/uploads', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", `${process.env.FRONTEND_URL}`);
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cookieParser());
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Enable CORS for API endpoints
app.use(cors({
    origin: `${process.env.FRONTEND_URL}`,
    credentials: true                      
}));

// Routes
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes); // Use book routes

// Example endpoint to verify JWT (for protected routes)
const authMiddleware = require('./middleware/authMiddleware');
app.get('/api/auth/verify', authMiddleware, (req, res) => {
  res.json({ msg: 'Token is valid', user: req.user });
});

// Serve React app's dist folder
const distPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(distPath));

// Handle all other routes by returning the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
