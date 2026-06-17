const {
  NotAuthenticated,
  NotAuthorized,
  NotFound,
} = require("../core/ApiError");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET;

const isLoggedIn = (req, res, next) => {
  const authorization = req.header("Authorization");

  if (!authorization) {
    throw new NotAuthenticated("Please login to continue");
  }

  const token = authorization.replace("Bearer ", "");
  const { userId } = jwt.verify(token, JWT_SECRET);
  req.userId = userId;
  next();
};

const isPartner = async (req, res, next) => {
  const { userId } = req;
  const user = await User.findById(userId);

  if (!user) {
    throw new NotFound("User not found");
  }

  if (user.role !== "PARTNER") {
    throw new NotAuthorized("You don't have required access to this resource");
  }

  next();
};

module.exports = { isLoggedIn, isPartner };
