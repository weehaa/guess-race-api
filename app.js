const express = require('express');

const dotenv = require('dotenv');
// HTTP request logger middleware for node.js
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xssClean = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('colors');

// Load env vars
dotenv.config({ path: './config/config.env' });

const connectDB = require('./config/db');
const errorHandler = require('./middleware/error-handler');

//Import route files
const languages = require('./routes/languages');
const wordsRouter = require('./routes/words');

// Connect to DB
connectDB();

// App
const app = express();

// Apply logging middleware in development mode
process.env.NODE_ENV === 'development' && app.use(morgan('dev'));

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attack
app.use(xssClean());

// Apply rate limiter
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 1000
});

app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// Mount routers
app.use('/api/v1/languages', languages);
app.use('/api/v1/words', wordsRouter);

// Error handler
app.use(errorHandler);

module.exports = app;