const dotenv = require('dotenv');

// Models
const { Movie } = require('../models/movie.model');

// Utils
const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');
const { filterObj } = require('../util/filterObj');

dotenv.config({ path: './config.env' });

//Get all movies
exports.getAllMovies = catchAsync(async (req, res, next) => {
  const movies = await Movie.findAll({
    where: { status: 'active' }
  });
  console.table(movies);
  res.status(200).json({
    status: 'success',
    data: {
      movies
    }
  });
});

//Get by Id movie
exports.getMovieById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const movie = await Movie.findOne({
    where: { id: id, status: 'active' }
  });

  if (!movie) {
    return next(new AppError(404, 'No movie found with the given ID'));
  }

  res.status(200).json({
    status: 'success',
    data: {
      movie
    }
  });
});

// Create new movie
exports.createNewMovie = catchAsync(async (req, res, next) => {
  const { title, description, duration, rating, img, genre } = req.body;

  if (!title || !description || !duration || !rating || !img || !genre) {
    return next(
      new AppError(
        400,
        'Must provide title, description, duration, rating, img, genre'
      )
    );
  }

  const newMovie = await Movie.create({
    title: title, // dbColumn: valueToInsert
    description: description,
    duration: duration,
    rating: rating,
    img: img,
    genre: genre
  });

  res.status(201).json({
    status: 'success',
    data: { newMovie }
  });
});

//update movie
exports.updateMovie = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;
    const data = filterObj(
      req.body,
      'title',
      'description',
      'duration',
      'genre'
    );

    const movie = await Movie.findOne({
      where: { id: id, status: 'active' }
    });

    if (!movie) {
      res.status(404).json({
        status: 'error',
        message: 'Cant update movie, invalid ID'
      });
      return;
    }

    await movie.update({ ...data });

    res.status(204).json({ status: 'success' });
  } catch (error) {
    console.log(error);
  }
});

//deleted movie
exports.deleteMovie = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;

    const movie = await Movie.findOne({
      where: { id: id, status: 'active' }
    });

    if (!movie) {
      res.status(404).json({
        status: 'error',
        message: 'Cant delete movie, invalid ID'
      });
      return;
    }

    // Soft delete
    await movie.update({ status: 'deleted' });

    res.status(204).json({ status: 'success' });
  } catch (error) {
    console.log(error);
  }
});
