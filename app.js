const express = require("express");
const path = require("path");

const app = express();

// 1) GOBAL MIDDLEWARES
//serving static files
app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
