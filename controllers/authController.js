const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const User = require("./../models/userModel");
const Task = require("./../models/taskModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);
  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIES_EXPIRES_IN * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });

  //remove password from output
  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    data: user,
  });
};

//route controller function
exports.signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  createSendToken(newUser, 201, req, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //check email, password exist
  if (!email || !password) {
    return next(new AppError("Please provide email & password!", 400));
  }

  //check exist user and correct password
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("email or password does not match!", 401));
  }

  //if all ok send token
  createSendToken(user, 200, req, res);
});

exports.logOut = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expiresIn: new Date(Date.now() + 10 * 1000),
  });

  res.status(200).json({
    status: "success",
  });
};

//middlewares
exports.protectRoute = catchAsync(async (req, res, next) => {
  //check token is there in req
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(
      new AppError("You are not logged in! Please login to get access.", 401)
    );
  }

  //verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //check user still exists
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist!",
        401
      )
    );
  }

  //Grant access
  req.user = freshUser;
  res.locals.user = freshUser;
  next();
});

exports.restrictTo = (...roles) => {
  return catchAsync(async (req, res, next) => {
    if (roles.includes("user") && req.user.role === "user") {
      const doc = await Task.findById(req.params.id);
      if (req.user.email !== doc.user.email) {
        return next(
          new AppError(
            "You do not have permission to perform this action.",
            403
          )
        );
      }
      return next();
    }
    //here roles = ['admin', 'user']
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action.", 403)
      );
    }
    next();
  });
};
