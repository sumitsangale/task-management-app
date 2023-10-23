const express = require("express");
const viewController = require("./../controllers/viewController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.get("/", authController.isLoggedIn, viewController.getHome);
router.get("/signup", authController.isLoggedIn, viewController.getSignupForm);
router.get("/login", authController.isLoggedIn, viewController.getLoginForm);

module.exports = router;
