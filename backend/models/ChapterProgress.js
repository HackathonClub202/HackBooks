const mongoose = require('mongoose');

const ChapterProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  chapter: {
    type: Number,
    required: true, 
  },
  completed: {
    type: Boolean,
    default: false,
  },
  completedChapters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' }],
});

module.exports = mongoose.model('ChapterProgress', ChapterProgressSchema);
