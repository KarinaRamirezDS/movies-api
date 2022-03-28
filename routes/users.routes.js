const express = require('express');

// Controllers
const {
  getAllUsers,
  getUserById,
  createNewUser,
  updateUser,
  deleteUser,
  loginUser
} = require('../controllers/user.controller');

const {
  validateSession,
  protectAdmin
} = require('../middlewares/auth.middleware');

const {
  userExists,
  protectAccountOwner
} = require('../middlewares/users.middleware');

const router = express.Router();

router.post('/', createNewUser);
router.post('/login', loginUser);

router.use(validateSession);

router.get('/', protectAdmin, getAllUsers);

router.use('/:id', userExists);

router.get('/:id', getUserById);

router.use('/:id', protectAccountOwner);

router.patch('/:id', updateUser);
router.delete('/id', deleteUser);

module.exports = { usersRouter: router };
