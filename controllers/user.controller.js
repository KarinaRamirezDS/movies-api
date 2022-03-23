const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Models
const { User } = require('../models/user.model');

// Utils
const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');
const { filterObj } = require('../util/filterObj');

dotenv.config({ path: './config.env' });

//Get all users
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    where: { status: 'active' },
    attributes: { exclude: ['password'] }
  });
  console.table(users);
  res.status(200).json({
    status: 'success',
    data: {
      users
    }
  });
});

//Get by Id user
exports.getUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({ where: { id } });

  if (!user) {
    return next(new AppError(404, 'User not found'));
  }

  res.status(200).json({
    status: 'success',
    data: { user }
  });
});

//Create new User
exports.createNewUser = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return next(
      new AppError(400, 'Must provide a valid name, email and password')
    );
  }

  const salt = await bcrypt.genSalt(12);

  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword
  });

  // Remove password from response
  newUser.password = undefined;

  res.status(201).json({
    status: 'success',
    data: { newUser }
  });
});

//updateUser
exports.updateUser = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;
    const data = filterObj(req.body, 'username', 'email');

    const user = await User.findOne({
      where: { id: id, status: 'active' }
    });

    if (!user) {
      res.status(404).json({
        status: 'error',
        message: 'Cant update user, invalid ID'
      });
      return;
    }

    await user.update({ ...data }); // .update({ title, author })

    res.status(204).json({ status: 'success' });
  } catch (error) {
    console.log(error);
  }
});

exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Find user given an email and has status active
  const user = await User.findOne({
    where: { email, status: 'active' }
  });

  // Compare entered password vs hashed password
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError(400, 'Credentials are invalid'));
  }

  //Create JWT
  const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

  res.status(200).json({
    status: 'success',
    data: { token }
  });
});
