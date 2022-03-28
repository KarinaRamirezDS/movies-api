const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const { validationResult } = require('express-validator');
// Models
const { Movie } = require('../models/movie.model');
const { Actor } = require('../models/actor.model');
const { ActorInMovie } = require('../models/actorInMovie.model');

// Utils
const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');
const { filterObj } = require('../util/filterObj');
const { storage } = require('../util/firebase');

//Get all movies
exports.getAllMovies = catchAsync(async (req, res, next) => {
  const movies = await Movie.findAll({
    where: { status: 'active' },
    include: [{ model: Actor }]
  });

  //console.table(movies);

  res.status(200).json({
    status: 'success',
    data: {
      movies
    }
  });
});

//Get by Id movie
exports.getMovieById = catchAsync(async (req, res, next) => {
  const { movie } = req;

  res.status(200).json({
    status: 'success',
    data: {
      movie
    }
  });
});

// Create new movie
exports.createNewMovie = catchAsync(async (req, res, next) => {
  const { title, description, duration, rating, genre, actors } = req.body;

  const errors = validationResult(req);

  //isEmpty proviene de express validator

  if (!errors.isEmpty()) {
    const errorMsg = errors
      .array()
      .map(({ msg }) => msg)
      .join('. ');
    return next(new AppError(400, errorMsg));
  }

  const fileExtension = req.file.originalname.split('.')[1];

  const imgRef = ref(
    storage,
    `imgs/movies/${title}-${Date.now()}.${fileExtension}`
  );

  const imgUploaded = await uploadBytes(imgRef, req.file.buffer);

  const newMovie = await Movie.create({
    title: title,
    description: description,
    duration: duration,
    rating: rating,
    img: imgUploaded.metadata.fullPath,
    genre: genre
  });

  const actorsInMoviesPromises = actors.map(async (actorId) => {
    return await ActorInMovie.create({ actorId, movieId: newMovie.id });
  });

  await Promise.all(actorsInMoviesPromises);

  res.status(200).json({
    status: 'success',
    data: { newMovie }
  });
});

//update movie
exports.updateMovie = catchAsync(async (req, res) => {
  const { movie } = req;

  const data = filterObj(
    req.body,
    'title',
    'description',
    'duration',
    'rating',
    'genre'
  );

  await movie.update({ ...data });

  res.status(204).json({ status: 'success' });
});

//deleted movie
exports.deleteMovie = catchAsync(async (req, res, next) => {
  const { movie } = req;

  // Soft delete
  await movie.update({ status: 'deleted' });

  res.status(204).json({ status: 'success' });
});
