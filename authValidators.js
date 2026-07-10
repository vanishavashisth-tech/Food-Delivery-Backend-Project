const { body, validationResult } = require("express-validator");
const AppError = require("../../utils/AppError");

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const message = errors.array().map((e) => e.msg).join(". ");
    return next(new AppError(message, 400));
  }
  next();
};

exports.registerRules = [
  body("name").trim().isLength({ min: 2, max: 60 }).withMessage("Name must be 2-60 characters"),
  body("email").isEmail().withMessage("Please provide a valid email").normalizeEmail(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number"),
  body("role")
    .optional()
    .isIn(["customer", "restaurantOwner"])
    .withMessage("Invalid role selection"),
  body("phone")
    .optional()
    .matches(/^[0-9]{10}$/)
    .withMessage("Phone must be a valid 10-digit number"),
];

exports.loginRules = [
  body("email").isEmail().withMessage("Please provide a valid email").normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
];

exports.updatePasswordRules = [
  body("currentPassword").notEmpty().withMessage("Current password is required"),
  body("newPassword")
    .isLength({ min: 8 })
    .withMessage("New password must be at least 8 characters")
    .matches(/\d/)
    .withMessage("New password must contain a number"),
];
