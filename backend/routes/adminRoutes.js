const express = require('express');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Book = require('../models/Book');
const AllowedUser = require('../models/AllowedUser');
const authMiddleware = require('../middleware/authMiddleware');


const multer = require('multer');
const path = require('path');

const router = express.Router();

// Set up storage for PDF uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Ensure this folder exists
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + '-' + file.originalname);
    },
  });
  const upload = multer({ storage: storage });
// Existing admin registration


// Existing admin login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token, { httpOnly: true });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// New route: Add allowed user by email (admin only)
router.post('/add-user', authMiddleware, async (req, res) => {
  // Check if the logged-in user is an admin
  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Access denied. Admins only.' });
  }
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ msg: 'Email is required.' });
  }
  try {
    // Check if the email is already in the allowed list
    const existingUser = await AllowedUser.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists.' });
    }
    // Add the allowed user email
    const newUser = new AllowedUser({ email });
    await newUser.save();
    res.json({ msg: 'User added successfully', user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});
// New route: Get all allowed users (admin only)
router.get('/allowed-users', authMiddleware, async (req, res) => {
    // Check if the logged-in user is an admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied. Admins only.' });
    }
    try {
      const allowedUsers = await AllowedUser.find({});
      res.json({ allowedUsers });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Server error' });
    }
  });


// New route: Upload a book with dynamic chapters (admin only)
router.post('/upload-book', authMiddleware, upload.array('chapterPDF'), async (req, res) => {
    // Ensure the user is an admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied. Admins only.' });
    }
    const { title, description } = req.body;
    
    // Get chapter titles from req.body; they can come as a single string or an array
    let chapterTitles = req.body.chapterTitle;
    if (!chapterTitles) {
      return res.status(400).json({ msg: 'Chapter titles are required.' });
    }
    if (!Array.isArray(chapterTitles)) {
      chapterTitles = [chapterTitles];
    }
    
    // Files uploaded by Multer are in req.files (an array)
    const files = req.files;
    if (files.length !== chapterTitles.length) {
      return res.status(400).json({ msg: 'The number of PDF files must match the number of chapter titles.' });
    }
    
    // Build chapters array by matching chapter titles with their corresponding uploaded file paths
    const chapters = chapterTitles.map((chapTitle, index) => ({
      title: chapTitle,
      pdfUrl: files[index].path,
    }));
    
    try {
      const book = new Book({ title, description, chapters });
      await book.save();
      res.json({ msg: 'Book uploaded successfully', book });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Server error' });
    }
  });
  
// New route: Get details of a specific book (admin only)
// New route: Get all books (admin only)
router.get('/books', authMiddleware, async (req, res) => {
  // Only admins allowed
  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Access denied. Admins only.' });
  }
  try {
    const books = await require('../models/Book').find();
    res.json({ books });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});


// New route: Update a book (append new chapters and update title/description) (admin only)
router.put('/book/:id', authMiddleware, upload.array('chapterPDF'), async (req, res) => {
  // Only admins allowed
  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Access denied. Admins only.' });
  }
  const { id } = req.params;
  const { title, description } = req.body;
  
  // Get new chapter titles from req.body (can be single string or array)
  let newChapterTitles = req.body.chapterTitle;
  let newChapters = [];
  if (newChapterTitles) {
    if (!Array.isArray(newChapterTitles)) {
      newChapterTitles = [newChapterTitles];
    }
    const files = req.files;
    if (files.length !== newChapterTitles.length) {
      return res.status(400).json({ msg: 'The number of uploaded files must match the number of chapter titles.' });
    }
    newChapters = newChapterTitles.map((chapTitle, index) => ({
      title: chapTitle,
      pdfUrl: files[index].path,
    }));
  }
  
  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ msg: 'Book not found' });
    }
    // Update title and description if provided
    if (title) book.title = title;
    if (description) book.description = description;
    // Append new chapters if provided
    if (newChapters.length > 0) {
      book.chapters = book.chapters.concat(newChapters);
    }
    await book.save();
    res.json({ msg: 'Book updated successfully', book });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
