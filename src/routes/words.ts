import { Router } from 'express';
import { getWords, getLanguageWords, getRandomWord, getWordExists } from '../controllers/words';

const router = Router({ mergeParams: true });

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

export default router;