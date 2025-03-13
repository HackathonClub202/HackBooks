// routes/content.js
const express = require("express");
const Chapter = require("../models/Chapter");
const adminAuth = require("../middleware/auth");
const multer = require("multer");
const router = express.Router();

// Upload a chapter PDF
router.post("/upload", adminAuth, (req, res) => {
  const upload = multer({ dest: "uploads/" }).single("pdf");

  upload(req, res, async (err) => {
    if (err) return res.status(500).json({ message: "File upload error" });

    const { title } = req.body;
    const pdfUrl = req.file.path; // Use a proper cloud storage in production
    const newChapter = new Chapter({ title, pdfUrl });

    try {
      await newChapter.save();
      res.status(201).json({ message: "Chapter uploaded successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error uploading chapter", error: error.message });
    }
  });
});

// Add test questions to a chapter
router.post("/:id/questions", adminAuth, async (req, res) => {
  const { questions } = req.body;

  try {
    const chapter = await Chapter.findById(req.params.id);
    if (!chapter) return res.status(404).json({ message: "Chapter not found" });

    chapter.questions = questions;
    await chapter.save();
    res.status(200).json({ message: "Questions added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding questions", error: error.message });
  }
});

module.exports = router;
