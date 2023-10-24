const express = require("express");
const viewController = require("./../controllers/viewController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.get("/", authController.isLoggedIn, viewController.getHome);
router.get("/signup", authController.isLoggedIn, viewController.getSignupForm);
router.get("/login", authController.isLoggedIn, viewController.getLoginForm);
router.get("/create-task", viewController.createTask);
router.get("/edit-task/:id", viewController.editTask);

module.exports = router;
