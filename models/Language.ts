import { Schema, model } from 'mongoose';

const LanguageSchema = new Schema({
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

export default model('Language', LanguageSchema);