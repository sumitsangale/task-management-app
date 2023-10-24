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

exports.getSignupForm = (req, res, next) => {
  res.status(200).render("signup.pug", {
    title: "signup to start",
  });
};

exports.getLoginForm = (req, res, next) => {
  res.status(200).render("login.pug", {
    title: "log into your account",
  });
};

exports.createTask = (req, res, next) => {
  res.status(200).render("createtaskform.pug", {
    title: "create task",
  });
};

exports.editTask = catchAsync(async (req, res, next) => {
  //read task data
  const task = await Task.findById(req.params.id);

  res.status(200).render("edittaskform.pug", {
    title: "edit task",
    task,
  });
});
