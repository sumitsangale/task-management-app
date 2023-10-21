const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

//route controller functions
exports.getUser = catchAsync(async (req, res, next) => {
  //get requested user from DB
  const doc = await User.findById(req.params.id);

  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }

  //send success response
  res.status(200).json({
    status: "success",
    data: doc,
  });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  //get all user from DB
  const doc = await User.find();

  //send success response
  res.status(200).json({
    status: "success",
    data: doc,
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  //upadte requested user in DB with validate
  const doc = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }

  //send success response
  res.status(200).json({
    status: "success",
    data: doc,
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  //delete requested user from DB
  const doc = await User.findByIdAndDelete(req.params.id);

  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }

  //send success response
  res.status(204).json({
    status: "success",
    data: null,
  });
});
