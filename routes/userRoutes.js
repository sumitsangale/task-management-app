const express = require("express");

const authController = require("./../controllers/authController");
const userController = require("./../controllers/userController");

const router = express.Router();
router.post("/signup", authController.signUp);
router.post("/login", authController.login);
router.get("/logout", authController.logOut);

// Protect all routes after this middleware
router.use(authController.protectRoute, authController.restrictTo("admin"));

router.route("/").get(userController.getAllUsers);
router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
