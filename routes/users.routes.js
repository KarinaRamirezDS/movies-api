const express = require('express');

// Controllers
const {
  getAllUsers,
  getUserById,
  createNewUser,
  loginUser
} = require('../controllers/user.controller');



const router = express.Router();

router.get('/', getAllUsers);

router.get('/:id', getUserById);

router.post('/', createNewUser);

module.exports = { usersRouter: router };

