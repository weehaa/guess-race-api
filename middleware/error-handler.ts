import { Request, Response, NextFunction } from 'express';
import ErrorResponse from '../utils/error-response';
import color from 'colors/safe';

const errorHandler = (
  err: ErrorResponse,
  _req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!err || err.name !== 'ErrorResponse') {
    err = new ErrorResponse(err);
  }
  if (typeof err.stack !== 'undefined')
    console.log(color.red(err.stack));
    
  const { message, statusCode, dbError } = err;

  res.status(statusCode).json({
    success: false,
    error: message,
    dbError,
  });
  next();
};

export default errorHandler;
