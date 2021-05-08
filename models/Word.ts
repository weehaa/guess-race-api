import { Schema, model } from 'mongoose';

const WordSchema = new Schema({
  word: {
    type: String,
    required: [true, 'Word is required'],
    unique: true,
    trim: true,
    maxlength: [20, 'Word can not be more than 20 characters long'],
  },
  languageId: {
    type: Schema.Types.String,
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

export default model('Word', WordSchema);