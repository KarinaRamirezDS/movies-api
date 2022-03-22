const express = require('express');

const {
  getAllActors,
  getActorById,
  createNewActor,
  updateActor,
  deleteActor
} = require('../controllers/actor.controller');

const router = express.Router();

router.get('/', getAllActors);

// GET http://localhost:4000/actors/:id
router.get('/:id', getActorById);

// POST http://localhost:4000/actors
router.post('/', createNewActor);

// PATCH http://localhost:4000/actors/:id
router.patch('/:id', updateActor);

// DELETE http://localhost:4000/actors/:id
router.delete('/:id', deleteActor);

module.exports = { actorsRouter: router };
