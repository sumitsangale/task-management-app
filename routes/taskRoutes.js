const express = require("express");
const taskController = require("./../controllers/taskController");
const authController = require("./../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(taskController.getAllTasks)
  .post(
    authController.protectRoute,
    taskController.setUserIds,
    taskController.createTask
  );

// apply middleware to protect route and role
router.use(authController.protectRoute);

router
  .route("/:id")
  .patch(authController.restrictTo("admin", "user"), taskController.updateTask)
  .delete(
    authController.restrictTo("admin", "user"),
    taskController.deleteTask
  );

module.exports = router;
