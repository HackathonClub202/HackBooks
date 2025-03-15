// controllers/contentController.js
const Chapter = require('../models/Chapter');
const Test = require('../models/Test');

exports.getChapters = async (req, res) => {
  try {
    const chapters = await Chapter.find().sort({ sequence: 1 });
    res.status(200).json(chapters);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch chapters' });
  }
};
// controllers/contentController.js

exports.getTest = async (req, res) => {
  try {
    const questions = await Test.aggregate([
      { $match: { chapterId: req.params.chapterId } },
      { $sample: { size: 10 } },
    ]);
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch test' });
  }
};
