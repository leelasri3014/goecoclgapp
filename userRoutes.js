const express = require("express");
const {
  registerController,
  loginController,
  updateUserController,
  updateProfileImageController,
  requireSingIn,
} = require("../controllers/userController");
const User = require('../models/userModel'); // Adjust the path to your User model
const { verifyToken } = require('../helpers/authHelper'); // Middleware to verify token

//riouter object
const router = express.Router();

//routes
// REGISTER || POST
router.post("/register", registerController);

// LOGIN || POST
router.post("/login", loginController);

//UPDATE || PUT
router.put("/update-user", requireSingIn, updateUserController);

router.put("/update-profile-image", requireSingIn, updateProfileImageController);

//export
module.exports = router;
