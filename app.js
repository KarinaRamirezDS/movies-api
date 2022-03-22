const express = require('express');
// Controllers
const { globalErrorHandler } = require('./controllers/error.controller');

// Routers
const { actorsRouter } = require('./routes/actors.routes');
const { usersRouter } = require('./routes/users.routes');
const { moviesRouter } = require('./routes/movies.routes');

// Utils
const { AppError } = require('./util/appError');

// Init express app
const app = express();

// Enable JSON incoming data
app.use(express.json());

// Endpoints
app.use('/api/v1/actors', actorsRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/movies', moviesRouter);

// Error handler (err -> AppError)
app.use(globalErrorHandler);

module.exports = { app };
