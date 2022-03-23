const express = require('express');

// Controllers
const {
  getAllUsers,
  getUserById,
  createNewUser,
  updateUser,
  loginUser
} = require('../controllers/user.controller');

const { validateSession} = require('../middlewares/auth.middleware')

const router = express.Router();

router.get('/', validateSession, getAllUsers);
router.get('/:id',validateSession, getUserById);
router.post('/', createNewUser);
router.patch('/:id', updateUser);

router.post('/login', loginUser )

module.exports = { usersRouter: router };
