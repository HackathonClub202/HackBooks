const mongoose = require('mongoose');

const ChapterSchema = new mongoose.Schema({
  title: { type: String, required: true },
  pdfUrl: { type: String, required: true },
});

const BookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    chapters: { type: [ChapterSchema], required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Book', BookSchema);
