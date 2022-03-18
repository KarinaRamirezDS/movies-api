const dotenv = require('dotenv');

// Models
const { Actor } = require('../models/actor.model');

// Utils
const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');
const { filterObj } = require('../util/filterObj');

dotenv.config({ path: './config.env' });

//Get all actors
exports.getAllActors = catchAsync(async (req, res,next ) => {
    const actors = await Actor.findAll({
        where: { status: 'active' }
      });
      console.table(actors)
      res.status(200).json({
        status: 'success',
        data: {
          actors
        }
        
      });
 
});

//Get by Id users
exports.getActorById = catchAsync(async (req, res,next ) => {
    const { id } = req.params;

    // SELECT * FROM actors WHERE id = 1;
    const actor = await Actor.findOne({
      where: { id: id, status: 'active' }
    });

    if (!actor) {
        return next(
          new AppError(404, 'No actor found with the given ID')
        );
      }

      res.status(200).json({
        status: 'success',
        data: {
          actor
        }
      });
  
});

//Create new User
//Get all users
exports.createNewActor = catchAsync(async (req, res,next ) => {
    const { name, country, rating, age, profilePic } = req.body;

    if (!name || !country || !rating || !age || !profilePic) {
        return next(
          new AppError(
            400,
            'Must provide a valid title, content and userId'
          )
        );
      }

      const newActor = await Actor.create({
        name: name, // dbColumn: valueToInsert
        country: country,
        rating: rating,
        age: age,
        profilePic: profilePic
      });

      res.status(201).json({
        status: 'success',
        data: { newActor }
      });
});

exports.updateActor = catchAsync(async (req, res ) => {

    try {
        const { id } = req.params;
        const data = filterObj(
          req.body,
          'name',
          'country',
          'rating',
          'age',
          'profilePic'
        );
    
        const actor = await Actor.findOne({
          where: { id: id, status: 'active' }
        });
    
        if (!actor) {
          res.status(404).json({
            status: 'error',
            message: 'Cant update actor, invalid ID'
          });
          return;
        }
    
        await actor.update({ ...data }); // .update({ title, author })
    
        res.status(204).json({ status: 'success' });
      } catch (error) {
        console.log(error);
      }

});
exports.deleteActor = catchAsync(async (req, res,next ) => {


    try {
        const { id } = req.params;
    
        const actor = await Actor.findOne({
          where: { id: id, status: 'active' }
        });
    
        if (!actor) {
          res.status(404).json({
            status: 'error',
            message: 'Cant delete actor, invalid ID'
          });
          return;
        }

        // Soft delete
        await actor.update({ status: 'deleted' });
    
        res.status(204).json({ status: 'success' });
      } catch (error) {
        console.log(error);
      }
});


