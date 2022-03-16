const express = require('express');
// Controllers
const { globalErrorHandler } = require('./controllers/error.controller');

// Routers


// Utils
const { AppError } = require('./util/appError');

// Init express app
const app = express();



// Enable JSON incoming data
app.use(express.json());

// Error handler (err -> AppError)
app.use(globalErrorHandler);

module.exports = { app };
