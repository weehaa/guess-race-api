const express = require('express');

const dotenv = require('dotenv');
// HTTP request logger middleware for node.js
const morgan = require('morgan');
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
process.env.NODE_ENV === 'DEVELOPMENT' && app.use(morgan('dev'));

// Mount routers
app.use('/api/v1/languages', languages);
app.use('/api/v1/words', wordsRouter);

// Error handler
app.use(errorHandler);

module.exports = app;