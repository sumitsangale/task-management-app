const Task = require("./../models/taskModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.getHome = catchAsync(async (req, res, next) => {
  //get data
  const tasks = await Task.find();

  //create templete using response
  res.status(200).render("home.pug", {
    title: "All tasks",
    tasks,
  });
});
