const Words = require('../models/Word');
const asyncHandler = require('../middleware/async-handler');

// @desc    Get all words in the database
// @route   GET /api/v1/words
// @access  Public
exports.getWords = asyncHandler(async (req, res, next) => {
  const words = await Words.find();
  await res.status(200).json({
    success: true,
    data: words,
  });
  next();
});

// @desc    Get all words for language
// @route   GET /api/v1/words/:languageId
// @access  Public
exports.getLanguageWords = asyncHandler(async (req, res, next) => {
  const words = await Words.find({ languageId: req.params.languageId });
  await res.status(200).json({
    success: true,
    data: words,
  });
  next();
});

// @desc    Get if word exists for language
// @route   GET /api/v1/words/:languageId/wordexists?word=<word>
// @access  Public
exports.getWordExists = asyncHandler(async (req, res, next) => {
  const word = await Words.findOne(
    {
      languageId: req.params.languageId,
      word: req.query.word
    });

  if (!word) {
    throw {
      message: 'Word does not exist',
      statusCode: 404
    }
  }

  await res.status(200).json({
    success: true,
    data: { wordExists: true },
  });
  next();
});

// @desc    Get random word for language
// @route   GET /api/v1/words/:languageId/randomword
// @access  Public
exports.getRandomWord = asyncHandler(async (req, res, next) => {

  let { level, minlength, maxlength, exclusions = [] } = req.query;

  level = parseInt(level || process.env.WORD_DEFAULT_LEVEL);
  minlength = parseInt(minlength || process.env.WORD_MIN_LENGTH);
  maxlength = parseInt(maxlength || process.env.WORD_MAX_LENGTH);

  const randomWord = await Words
    .aggregate([
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

  await res.status(200).json({
    success: true,
    data: randomWord,
  });
  next();
});
