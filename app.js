const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");

const taskRouter = require("./routes/taskRoutes");
const userRouter = require("./routes/userRoutes");
const viewRouter = require("./routes/viewRoutes");
const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appError");

const app = express();

//setting pug template
app.set("veiw engine", "pug");
app.set("views", path.join(__dirname, "views"));

//# GOBAL MIDDLEWARES
//serving static files
app.use(express.static(path.join(__dirname, "public")));

// Set security headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        connectSrc: ["'self'", "ws://localhost:*"],
        imgSrc: ["'self'", "*", "data:"],
        scriptSrc: ["'self'", "https://cdn.jsdelivr.net"],
        frameSrc: ["'self'"],
      },
    },
  })
);

//body parser to read from request body
app.use(express.json());
app.use(cookieParser());

app.use((req, resp, next) => {
  resp.setHeader(
    "Access-Control-Allow-Headers",
    "origin, Content-Type, x-requested-with, Accept, Authorization"
  );
  resp.setHeader(
    "Access-Control-Allow-Methods",
    "POST, GET,PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.get("/js/bundle.js", (req, res, next) => {
  res.setHeader("Content-Type", "application/javascript");
  // Serve your JavaScript file here
  next();
});

//# ROUTES
app.use("/", viewRouter);
app.use("/api/v1/tasks", taskRouter);
app.use("/api/v1/users", userRouter);

//# ERROR HANDLING
app.use(globalErrorHandler);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
