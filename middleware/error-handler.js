const ErrorResponse = require('../utils/error-response');

const errorHandler = (err, req, res, next) => {
  if (!err || err.name !== 'ErrorResponse') {
    err = new ErrorResponse(err);
  }
  console.log(err.stack.bold.red);
  const { message, statusCode, dbError } = err;

  res.status(statusCode).json({
    success: false,
    error: message,
    dbError,
  });
  next();
};

module.exports = errorHandler;