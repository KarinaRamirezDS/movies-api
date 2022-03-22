const express = require('express');

const {
  getAllMovies,
  getMovieById,
  createNewMovie,
  updateMovie,
  deleteMovie
} = require('../controllers/movie.controller');

const router = express.Router();

router.get('/', getAllMovies);

// GET http://localhost:4000/movies/:id
router.get('/:id', getMovieById);

// POST http://localhost:4000/movies
router.post('/', createNewMovie);

// PATCH http://localhost:4000/movies/:id
router.patch('/:id', updateMovie);

// DELETE http://localhost:4000/movies/:id
router.delete('/:id', deleteMovie);

module.exports = { moviesRouter: router };
