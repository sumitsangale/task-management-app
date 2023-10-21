const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A task must have a name"],
    unique: true,
    trim: true,
    maxlength: [40, "A task name must have less or equal then 40 characters"],
    minlength: [10, "A task name must have more or equal then 10 characters"],
  },
  description: {
    type: String,
    trim: true,
    required: [true, "A task must have a description"],
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
