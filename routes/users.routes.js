const express = require('express');

// Controllers
const {
  getAllUsers,
  getUserById,
  createNewUser,
  updateUser,
} = require('../controllers/user.controller');

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createNewUser);
router.patch('/:id', updateUser);

module.exports = { usersRouter: router };
