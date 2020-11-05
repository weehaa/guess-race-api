const mongoose = require('mongoose');

const LanguageSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: [true, 'Lang id is required'],
    match: [
      /^[a-z]{2}$/,
      'Language id must be 2 latin lowercase characters'
    ]
  },
  name: {
    type: String,
    required: [true, 'Lang name is required'],
    unique: true,
    trim: true,
    maxlength: [10, 'Language name can not be more than 10 characters long']
  },
});

module.exports = mongoose.model('Language', LanguageSchema);