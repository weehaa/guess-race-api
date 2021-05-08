import { Router } from 'express';
import { getLanguages } from '../controllers/languages';

const router = Router();


router
  .route('/')
  .get(getLanguages);

export default router;
