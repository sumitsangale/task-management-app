const express = require("express");
const path = require("path");

const taskRouter = require("./routes/taskRoutes");
const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appError");

const app = express();

//# GOBAL MIDDLEWARES
//serving static files
app.use(express.static(path.join(__dirname, "public")));
//body parser to read from request body
app.use(express.json());

//# ROUTES
app.use("/api/v1/tasks", taskRouter);

//# ERROR HANDLING
app.use(globalErrorHandler);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
