const express = require('express');
const { getLanguages } = require('../controllers/languages');

const router = express.Router();


router
  .route('/')
  .get(getLanguages);

module.exports = router;
