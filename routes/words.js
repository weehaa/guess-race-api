const express = require('express');
const {
  getWords,
  getLanguageWords,
  getRandomWord,
  getWordExists
} = require('../controllers/words');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(getWords);

router
  .route('/:languageId')
  .get(getLanguageWords);

router
  .route('/:languageId/wordexists')
  .get(getWordExists);

router
  .route('/:languageId/randomword')
  .get(getRandomWord);

module.exports = router;