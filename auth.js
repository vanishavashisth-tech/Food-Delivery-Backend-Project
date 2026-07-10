const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const User = require("../models/User");

// Verifies access token and attaches user to req
exports.protect = catchAsync(async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("You are not logged in. Please log in to access this resource.", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError("The user belonging to this token no longer exists.", 401));
  }

  if (!currentUser.isActive) {
    return next(new AppError("This account has been deactivated.", 401));
  }

  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(new AppError("Password was recently changed. Please log in again.", 401));
  }

  req.user = currentUser;
  next();
});

// Role-based access control, e.g. restrictTo("admin", "restaurantOwner")
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("You do not have permission to perform this action.", 403));
    }
    next();
  };
};
