const express = require('express');
const Book = require('../models/Book');
const authMiddleware = require('../middleware/authMiddleware');
const path = require('path');

const router = express.Router();

// Base URL utility
const getBaseUrl = (req) => `${req.protocol}://${req.get('host')}`;

// Serve static files from the 'uploads' directory
router.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Get all books (protected)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const books = await Book.find();
    const baseUrl = getBaseUrl(req);

    // Add base URL to each chapter's `pdfUrl`
    const booksWithUrls = books.map((book) => ({
      ...book.toObject(),
      chapters: book.chapters.map((chapter) => ({
        ...chapter,
        pdfUrl: `${baseUrl}/${chapter.pdfUrl.replace(/\\/g, '/')}`,
      })),
    }));

    res.json({ books: booksWithUrls });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get a specific book with chapters (protected)
router.get('/:bookId', authMiddleware, async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book) {
      return res.status(404).json({ msg: 'Book not found' });
    }

    const baseUrl = getBaseUrl(req);

    // Add base URL to each chapter's `pdfUrl`
    const bookWithUrls = {
      ...book.toObject(),
      chapters: book.chapters.map((chapter) => ({
        ...chapter,
        pdfUrl: `${baseUrl}/${chapter.pdfUrl.replace(/\\/g, '/')}`,
      })),
    };

    res.json({ book: bookWithUrls });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
