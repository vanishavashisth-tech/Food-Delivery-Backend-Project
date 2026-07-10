const jwt = require("jsonwebtoken");
const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const { sendTokenResponse, generateAccessToken } = require("../utils/generateTokens");

// @route POST /api/auth/register
exports.register = catchAsync(async (req, res, next) => {
  const { name, email, password, role, phone } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new AppError("An account with this email already exists", 400));
  }

  const user = await User.create({
    name,
    email,
    password,
    role: role || "customer",
    phone,
  });

  sendTokenResponse(user, 201, res, "Account created successfully");
});

// @route POST /api/auth/login
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  if (!user.isActive) {
    return next(new AppError("This account has been deactivated. Contact support.", 401));
  }

  sendTokenResponse(user, 200, res, "Logged in successfully");
});

// @route POST /api/auth/refresh
// Reads refreshToken from httpOnly cookie, issues new access token
exports.refresh = catchAsync(async (req, res, next) => {
  const token = req.cookies?.refreshToken;
  if (!token) {
    return next(new AppError("No refresh token provided. Please log in again.", 401));
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch (err) {
    return next(new AppError("Invalid or expired refresh token. Please log in again.", 401));
  }

  const user = await User.findById(decoded.id);
  if (!user) {
    return next(new AppError("User no longer exists", 401));
  }

  const accessToken = generateAccessToken(user);
  res.status(200).json({ success: true, accessToken });
});

// @route POST /api/auth/logout
exports.logout = catchAsync(async (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.status(200).json({ success: true, message: "Logged out successfully" });
});

// @route GET /api/auth/me
exports.getMe = catchAsync(async (req, res) => {
  res.status(200).json({ success: true, user: req.user.toSafeObject() });
});

// @route PATCH /api/auth/update-password
exports.updatePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id).select("+password");
  if (!(await user.comparePassword(currentPassword))) {
    return next(new AppError("Current password is incorrect", 401));
  }

  user.password = newPassword;
  await user.save();

  sendTokenResponse(user, 200, res, "Password updated successfully");
});

// @route PATCH /api/auth/update-profile
exports.updateProfile = catchAsync(async (req, res, next) => {
  const allowedFields = ["name", "phone", "address"];
  const updates = {};
  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) updates[field] = req.body[field];
  });

  const user = await User.findByIdAndUpdate(req.user._id, updates, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, message: "Profile updated", user: user.toSafeObject() });
});
