const Task = require("./../models/taskModel");

exports.getAllTasks = async (req, res, next) => {
  try {
    //read data
    const doc = await Task.find();
    console.log("data", doc);
    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      message: "Data send successfully!",
      data: doc,
    });
  } catch (error) {
    console.log("someting went wrong!", error);
    res.status(400).json({
      status: "fail",
      message: "Data not found!",
    });
  }
};

exports.createTask = async (req, res, next) => {
  try {
    const doc = await Task.create(req.body);

    res.status(201).json({
      status: "success",
      message: "Task created successfully!",
      data: {
        data: doc,
      },
    });
  } catch (error) {
    console.log("someting went wrong!", error);
    res.status(400).json({
      status: "fail",
      message: "Data not added!",
    });
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const doc = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      res.status(400).json({
        status: "fail",
        message: "Data not update!",
      });
      return;
    }

    res.status(200).json({
      status: "success",
      message: "Task updated successfully!",
      data: doc,
    });
  } catch (error) {
    console.log("someting went wrong!", error);
    res.status(400).json({
      status: "fail",
      message: "Data not update!",
    });
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const doc = await Task.findByIdAndDelete(req.params.id);

    if (!doc) {
      res.status(400).json({
        status: "fail",
        message: "Data not delete!",
      });
      return;
    }

    res.status(204).json({
      status: "success",
      message: "Task deleted successfully!",
      data: null,
    });
  } catch (error) {
    console.log("someting went wrong!", error);
    res.status(400).json({
      status: "fail",
      message: "Data not delete!",
    });
  }
};
