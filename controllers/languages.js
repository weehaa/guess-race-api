const Language = require('../models/Language');
const asyncHandler = require('../middleware/async-handler');

// @desc    Get all languages
// @route   GET /api/v1/languages
// @access  Public
exports.getLanguages = asyncHandler(async (req, res, next) => {
  const languages = await Language.find();
  await res.status(200).json({
    success: true,
    data: languages
  });
  next();
});