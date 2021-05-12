import { Error as MongoError } from 'mongoose'

export interface IErrorResponse extends Error {
  statusCode?: number;
  code?: number;
  value?: string;
  errors?: MongoError[];
}

class ErrorResponse extends Error {
  statusCode: number;
  dbError: string;

  constructor(error: IErrorResponse) {    
    const { message, name, value, code, statusCode, errors = [], stack } = error || {};    
    super(message);

    this.name = 'ErrorResponse';
    // Default values
    this.dbError = '';
    this.statusCode = statusCode || 500;
    this.message = message || 'Server Error';

    // Mongoose bad ObjectId
    if (name === 'CastError') {
      this.statusCode = 404;
      this.message = `Resource not found with id of ${value}`;
      this.dbError = message;
    }

    //Mongoose duplicate key
    if (code === 11000) {
      this.statusCode = 400;
      this.message = 'Duplicate field value';
      this.dbError = message;
    }

    // Mongoose validation errors
    if (name === 'ValidationError') {
      this.statusCode = 400;
      this.message = Object.values(errors).map(val => val.message).join('; ');
      this.dbError = message;
    }

    // provide the original error stack
    if (stack) {
      this.stack = this.stack + '\n' + stack;
    }

    if (Error.captureStackTrace) {
      Error.captureStackTrace(error, ErrorResponse)
    }
  }
}

export default ErrorResponse;