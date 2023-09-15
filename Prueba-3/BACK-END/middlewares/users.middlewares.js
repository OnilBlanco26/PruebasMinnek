const catchAsync = require("../helpers/catchAsync");
const { Users } = require("../models/users.models");


exports.validateUserById = catchAsync(async (req, res, next) => {
    const { id } = req.params;
  
    const user = await Users.findOne({
      where: {
        id,
        status: true,
      },
    });
  
    if (!user) {
      return res.status(404).json({
        status: 'Error',
        message: 'User not found',
      });
    }
  
    req.user = user;
    next();
  })
  

exports.validateUserByEmail = catchAsync( async (req, res, next) => {
    const { email } = req.body;
  
    const user = await Users.findOne({
      where: {
        email,
        status: true,
      },
    });
  
    if (user) {
      return res.status(400).json({
        status: 'Error',
        message: 'User already exists',
      });
    }
  
    next();
  })

  module.exports = {
    validateUserById,
    validateUserByEmail
  }