const mongoose = require('mongoose');

const WordSchema = new mongoose.Schema({
  word: {
    type: String,
    required: [true, 'Word is required'],
    unique: true,
    trim: true,
    maxlength: [20, 'Word can not be more than 20 characters long'],
  },
  languageId: {
    type: mongoose.Schema.Types.String,
    ref: 'Language',
    required: true,
  },
  level: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, 'Level should be a number between 1 and 5'],
  },
});

module.exports = mongoose.model('Word', WordSchema);