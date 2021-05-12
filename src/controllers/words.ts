import Words from '../models/Word';
import asyncHandler from 'express-async-handler';
import parseQueryParamNum from '../utils/parseQueryParamNum';

// @desc    Get all words in the database
// @route   GET /api/v1/words
// @access  Public
export const getWords = asyncHandler(async (req, res, next) => {
  const words = await Words.find();
  res.status(200).json({
    success: true,
    data: words,
  });
  next();
});

// @desc    Get all words for language
// @route   GET /api/v1/words/:languageId
// @access  Public
export const getLanguageWords = asyncHandler(async (req, res, next) => {
  const words = await Words.find({ languageId: req.params.languageId });
  res.status(200).json({
    success: true,
    data: words,
  });
  next();
});

// @desc    Get if word exists for language
// @route   GET /api/v1/words/:languageId/wordexists?word=<word>
// @access  Public
export const getWordExists = asyncHandler(async (req, res, next) => {
  const word = await Words.findOne({
    languageId: req.params.languageId,
    word: req.query.word,
  });

  if (!word) {
    throw {
      message: 'Word does not exist',
      statusCode: 404,
    };
  }

  res.status(200).json({
    success: true,
    data: {
      word,
      wordExists: true,
    },
  });
  next();
});

// @desc    Get random word for language
// @route   GET /api/v1/words/:languageId/randomword
// @access  Public
export const getRandomWord = asyncHandler(async (req, res, next) => {
  const query = req.query;
  const env = process.env;

  const level = parseQueryParamNum(query.level, env.WORD_DEFAULT_LEVEL);
  const minlength = parseQueryParamNum(query.minlength, env.WORD_MIN_LENGTH);
  const maxlength = parseQueryParamNum(query.maxlength, env.WORD_MAX_LENGTH);

  const { exclusions = [] } = req.query;

  const randomWord = await Words.aggregate([
    {
      $match: {
        languageId: req.params.languageId,
        level,
      },
    },
    {
      $addFields: {
        length: { $strLenCP: '$word' },
      },
    },
    {
      $match: {
        length: { $gte: minlength, $lte: maxlength },
        word: { $not: { $in: exclusions } },
      },
    },
    { $sample: { size: 1 } },
  ]);

  if (!randomWord || !randomWord.length) {
    throw {
      message: 'Could not retrieve random word with specified parameters',
      statusCode: 404,
    };
  }

  res.status(200).json({
    success: true,
    word: randomWord[0].word,
  });
  next();
});
