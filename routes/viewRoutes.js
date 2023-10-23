const express = require("express");
const viewController = require("./../controllers/viewController");

const router = express.Router();

router.get("/", viewController.getHome);
router.get("/signup", viewController.getSignupForm);
router.get("/login", viewController.getLoginForm);

module.exports = router;
