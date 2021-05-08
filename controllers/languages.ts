import Language from '../models/Language';
import asyncHandler from 'express-async-handler';

export const getLanguages = asyncHandler(async (_req, res, next) => {
  const languages = await Language.find();
  await res.status(200).json({
    success: true,
    data: languages
  });
  next();
});