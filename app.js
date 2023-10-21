const express = require("express");
const path = require("path");

const taskRouter = require("./routes/taskRoutes");

const app = express();

//# GOBAL MIDDLEWARES
//serving static files
app.use(express.static(path.join(__dirname, "public")));
//body parser to read from request body
app.use(express.json());

//# ROUTES
app.use("/api/v1/tasks", taskRouter);

module.exports = app;
