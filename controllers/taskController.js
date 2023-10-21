const Task = require("./../models/taskModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.getAllTasks = catchAsync(async (req, res, next) => {
  //read data from DB
  const doc = await Task.find();

  //send success response
  res.status(200).json({
    status: "success",
    message: "Data send successfully!",
    data: doc,
  });
});

exports.createTask = catchAsync(async (req, res, next) => {
  //save requested data in DB
  const doc = await Task.create(req.body);

  //send success response
  res.status(201).json({
    status: "success",
    message: "Task created successfully!",
    data: doc,
  });
});

exports.updateTask = catchAsync(async (req, res, next) => {
  //upadte requested data in DB with validate
  const doc = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }

  //send success response
  res.status(200).json({
    status: "success",
    message: "Task updated successfully!",
    data: doc,
  });
});

exports.deleteTask = catchAsync(async (req, res, next) => {
  //delete requested data from DB
  const doc = await Task.findByIdAndDelete(req.params.id);

  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }

  //send success response
  res.status(204).json({
    status: "success",
    message: "Task deleted successfully!",
    data: null,
  });
});
