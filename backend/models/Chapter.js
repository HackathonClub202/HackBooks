// models/Chapter.js
const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema({
  title: String,
  pdfUrl: String,
  status: { type: String, default: "inactive" },
  questions: [
    {
      question: String,
      options: [String],
      correctAnswer: String,
    },
  ],
});

module.exports = mongoose.model("Chapter", chapterSchema);
