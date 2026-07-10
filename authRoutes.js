const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { protect } = require("../middleware/auth");
const {
  validate,
  registerRules,
  loginRules,
  updatePasswordRules,
} = require("../middleware/validators/authValidators");

// Public routes
router.post("/register", registerRules, validate, authController.register);
router.post("/login", loginRules, validate, authController.login);
router.post("/refresh", authController.refresh);
router.post("/logout", authController.logout);

// Protected routes
router.get("/me", protect, authController.getMe);
router.patch("/update-password", protect, updatePasswordRules, validate, authController.updatePassword);
router.patch("/update-profile", protect, authController.updateProfile);

module.exports = router;
