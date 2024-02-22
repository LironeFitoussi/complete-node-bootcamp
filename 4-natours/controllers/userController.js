const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const filterObj = (obj, ...allowedFields) => {
  const filteredObj = {};
  Object.keys(obj).forEach((key) => {
    if (allowedFields.includes(key)) {
      filteredObj[key] = obj[key];
    }
  });
  return filteredObj;
};
exports.getAllUsers = async (req, res, next) => {
  const users = await User.find();

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
};

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'fail',
    message: 'Not Implemented',
  });
};

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'fail',
    message: 'Not Implemented',
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'fail',
    message: 'Not Implemented',
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'fail',
    message: 'Not Implemented',
  });
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if userPOSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    console.log('error');
    return next(
      new AppError(
        'This route is not for password updates. Please us /updateMyPassword ',
        400,
      ),
    );
  }
  // 2) Update the user document
  const filteredBody = filterObj(req.body, 'name', 'email');
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  //
  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});
