const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.authorize = (roles) => async (req, res, next) => {
  try {
    const authorization = req.headers["authorization"];

    if (!authorization) {
      const error = new Error("Unauthorize");
      error.statusCode = 401;
      throw error;
    }

    const spliteAuthorization = authorization.split(" ");
    const token = spliteAuthorization[1];

    let decode;
    try {
      decode = await jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
      const erro = new Error("Unauthorize");
      erro.statusCode = 401;
      throw error;
    }

    const { id } = decode;

    const user = await User.findById(id).lean();

    if (!user) {
      const error = new Error("user not found..!");
      error.statusCode = 404;
      throw error;
    }

    const role = user.role;

    if (!roles.includes(role)) {
      const error = new Error("authorize for this user...!");
      error.statusCode = 401;
      throw error;
    }

    req.user = user;

    next();
  } catch (error) {
    const statusCode = error.statusCode || 400;
    return res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
};
