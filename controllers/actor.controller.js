const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const { validationResult } = require('express-validator');

// Models
const { Actor } = require('../models/actor.model');
const { ActorInMovie } = require('../models/actorInMovie.model');

// Utils
const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');
const { filterObj } = require('../util/filterObj');
const { storage } = require('../util/firebase');
const { Movie } = require('../models/movie.model');

//Get all actors
exports.getAllActors = catchAsync(async (req, res, next) => {
  const actors = await Actor.findAll({
    where: { status: 'active' },
    include: [{ model: Movie, through: ActorInMovie }]
  });
  //console.table(actors);

  res.status(200).json({
    status: 'success',
    data: {
      actors
    }
  });
});

//Get by Id actor
exports.getActorById = catchAsync(async (req, res, next) => {
  const { actor } = req;

  res.status(200).json({
    status: 'success',
    data: {
      actor
    }
  });
});

//Create new actor
exports.createNewActor = catchAsync(async (req, res, next) => {
  const { name, country, rating, age } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // [msg, msg, msg, msg] -> msg. msg. msg...
    const errorMsg = errors
      .array()
      .map(({ msg }) => msg)
      .join('. ');

    return next(new AppError(400, errorMsg));
  }

  //UPLOAD IMAGE
  const fileExtension = req.file.originalname.split('.')[1];

  const imgRef = ref(
    storage,
    `imgs/actors/${name}-${Date.now()}.${fileExtension}`
  );

  const imgUploaded = await uploadBytes(imgRef, req.file.buffer);

  const newActor = await Actor.create({
    name: name, // dbColumn: valueToInsert
    country: country,
    rating: rating,
    age: age,
    profilePic: imgUploaded.metadata.fullPath
  });

  res.status(201).json({
    status: 'success',
    data: { newActor }
  });
});
//Update actor
exports.updateActor = catchAsync(async (req, res, next) => {
  const { actor } = req;

  const data = filterObj(req.body, 'name', 'country', 'rating', 'age');

  await actor.update({ ...data });

  res.status(204).json({ status: 'success' });
});
//delete user
exports.deleteActor = catchAsync(async (req, res) => {
  const { actor } = req;

  // Soft delete
  await actor.update({ status: 'deleted' });

  res.status(204).json({ status: 'success' });
});
