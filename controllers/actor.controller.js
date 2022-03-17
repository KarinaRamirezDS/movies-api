const dotenv = require('dotenv');

// Models
const { Actor } = require('../models/actor.model');

// Utils
const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');

dotenv.config({ path: './config.env' });

//Get all actors
exports.getAllActors = catchAsync(async (req, res,next ) => {

});

//Get by Id users
exports.getActorById = catchAsync(async (req, res,next ) => {

});

//Create new User
//Get all users
exports.createNewActor = catchAsync(async (req, res,next ) => {

});

exports.updateActor = catchAsync(async (req, res,next ) => {

});
exports.deleteActor = catchAsync(async (req, res,next ) => {

});


