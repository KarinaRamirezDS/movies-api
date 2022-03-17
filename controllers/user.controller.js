const dotenv = require('dotenv');

// Models
const { User } = require('../models/user.model');

// Utils
const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');

dotenv.config({ path: './config.env' });

//Get all users
exports.getAllUsers = catchAsync(async (req, res,next ) => {

});

//Get by Id users
exports.getUserById = catchAsync(async (req, res,next ) => {

});

//Create new User
//Get all users
exports.createNewUser = catchAsync(async (req, res,next ) => {

});


