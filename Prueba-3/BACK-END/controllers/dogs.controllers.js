const catchAsync = require("../helpers/catchAsync");
const Dogs = require("../models/dogs.models");
const SubBreed = require("../models/subBreed.models");


const findAllDogs = catchAsync(async (req, res, next) => {
    const dogs = await Dogs.findAll({
        where: {
            status: true
        },
        include: {
            model: SubBreed,
        }
    })

    if (!dogs || dogs.length === 0) {
        return res.status(404).json({
            status: 'Error',
            message: 'No registered dogs found'
        })
    }

    res.status(201).json({
        status: 'success',
        message: 'List of found dogs',
        data: {
            dogs
        }
    })
})

const findDogById = catchAsync(async (req, res, next) => {
    const { dog } = req;

    res.status(201).json({
        status: 'success',
        message: 'Dog successfully found',
        data: {
            dog
        }
    })
})

const createDog = catchAsync(async (req, res, next) => {
    const { name, breed, subBreeds, image } = req.body;
  
    // Crea el perro en la tabla Dogs
    const dog = await Dogs.create({
      name: name.toLowerCase().trim(),
      breed: breed.toLowerCase().trim(),
      image,
    });
  
    // Crea las subrazas y las relaciones en la tabla DogSubBreed
    for (const subBreedData of subBreeds) {
      const [subBreed, created] = await SubBreed.findOrCreate({
        where: { name: subBreedData.name.toLowerCase().trim() },
      });
  
      if (created) {
        // Solo establece la relación si la subraza es nueva
        await dog.addSubBreed(subBreed);
      }
    }
  
    return res.status(201).json({
      status: 'success',
      message: 'Perro creado exitosamente con subrazas',
      data: {
        dog,
      },
    });
  });

const updateDog = catchAsync(async (req, res, next) => {
    const { dog } = req;
    const { name, breed, image } = req.body;

    const updateDog = dog.update({ name, breed, image });

    res.status(200).json({
        status: 'success',
        message: 'The dog has been successfully updated',
        updateDog
    })
})

const deleteDog = catchAsync(async (req, res, next) => {
    const { dog } = req;

    await dog.update({ status: false });

    res.status(200).json({
        status: 'success',
        message: 'The dog has been deleted'
    })

    next();
})



module.exports = {
    findAllDogs,
    findDogById,
    createDog,
    updateDog,
    deleteDog,
}