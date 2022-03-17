const dotenv = require('dotenv');

// Models
const { Movie } = require('../models/movie.model');

// Utils
const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');

dotenv.config({ path: './config.env' });

//Get all actors
exports.getAllMovies = catchAsync(async (req, res,next ) => {

});

//Get by Id users
exports.getMovieById = catchAsync(async (req, res,next ) => {

});

//Create new User
//Get all users
exports.createNewMovie = catchAsync(async (req, res,next ) => {

});

exports.updateMovie = catchAsync(async (req, res,next ) => {

});
exports.deleteMovie = catchAsync(async (req, res,next ) => {

});


