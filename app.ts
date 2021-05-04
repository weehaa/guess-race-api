import express from 'express';

import dotenv from 'dotenv';
// HTTP request logger middleware for node.js
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
// import xssClean from 'xss-clean';
import hpp from 'hpp';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

// Load env vars
dotenv.config({ path: './config/config.env' });

import connectDB from './config/db';
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
// app.use(xssClean());

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

export default app;