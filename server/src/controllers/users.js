const User = require("../models/User");
const bcrypt = require("bcrypt");
const ApiResponse = require("../core/ApiResponse");
const { BadRequest } = require("../core/ApiError");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const MailgunClient = require("../lib/MailgunClient");

const JWT_SECRET = process.env.JWT_SECRET;

const registerUser = async (req, res) => {
  const { email, username, password, role } = req.body;

  const existingUser = await User.findOne({ username });

  if (existingUser) {
    throw new BadRequest("User with this username already exists");
  }

  const hashed = await bcrypt.hash(password, 12);

  const newUser = await User.create({
    email,
    username,
    password: hashed,
    role,
  });

  res.status(201).json(
    ApiResponse.build(
      true,
      {
        email: newUser.email,
        username: newUser.username,
      },
      "Registered successfully",
    ),
  );
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    throw new BadRequest("Username or password is invalid");
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw new BadRequest("Username or password is invalid");
  }

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });

  res.json(ApiResponse.build(true, { token }, "Logged in successfully"));
};

const getProfile = async (req, res) => {
  const { userId } = req;
  const user = await User.findById(userId);
  res.json(
    ApiResponse.build(
      true,
      { username: user.username, email: user.email, role: user.role },
      "User Profile details",
    ),
  );
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new BadRequest("Invalid Email");
  }

  const token = crypto.randomBytes(12).toString("hex");

  user.resetPasswordToken = token;
  user.resetPasswordExpiry = new Date().getTime() + 15 * 60 * 1000;
  await user.save();

  const forgotPasswordUrl = `${process.env.FRONTEND_BASE_URL}/reset-password?token=${token}&email=${email}`;

  await MailgunClient.sendEmail(
    [email],
    "Forgot Password",
    `
    Hi There!
    Please click on the link ${forgotPasswordUrl} to reset your password.
    
    Thanks
    BMS team
    `,
  );

  res
    .status(200)
    .json(
      ApiResponse.build(
        true,
        "Reset password link sent",
        "Reset password link sent",
      ),
    );
};

const resetPassword = async (req, res) => {
  const { token, email, newPassword } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new BadRequest("Invalid Email");
  }

  if (!user.isValidResetToken(token)) {
    throw new BadRequest("Invalid Token or Token has expired");
  }

  const newHash = await bcrypt.hash(newPassword, 12);

  user.password = newHash;
  user.resetPasswordToken = null;
  user.resetPasswordExpiry = null;
  await user.save();

  res
    .status(200)
    .json(
      ApiResponse.build(
        true,
        "Password reset successfully",
        "Password reset successfully",
      ),
    );
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  forgotPassword,
  resetPassword,
};
