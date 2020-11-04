const express = require('express');

const dotenv = require('dotenv');
// HTTP request logger middleware for node.js
const morgan = require('morgan');
require('colors');

// Load env vars
dotenv.config({ path: './config/config.env' });

const connectDB = require('./config/db');

// Connect to DB
connectDB();

// App
const app = express();

// Apply logging middleware in development mode
process.env.NODE_ENV === 'DEVELOPMENT' && app.use(morgan('dev'));

const PORT = process.env.PORT || 5050;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.black.bold);
});

// Handle unhandled rejections
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`.red);
  // Close server and exit process
  server.close(() => process.exit(1));
});

module.exports = app;