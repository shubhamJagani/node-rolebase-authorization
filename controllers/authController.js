const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  try {
    const { userName, age, gender, email } = req.body;

    const harshPW = await bcrypt.hash(req.body.password, 12);

    const newUser = {
      userName,
      age,
      gender,
      email,
      password: harshPW,
    };

    const user = await User.create(newUser);

    return res.status(200).json({
      success: true,
      result: user,
      message: "users added successfully..!",
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: error.message,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("user not found..!");
      error.satusCode = 404;
      throw error;
    }

    const cmpPassword = await bcrypt.compare(password, user.password);

    if (!cmpPassword) {
      const error = new Error("check your email or password..!");
      error.satusCode = 404;
      throw error;
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "24h",
    });

    return res.status(200).json({
      success: true,
      result: token,
      message: "users added successfully..!",
    });
  } catch (error) {
    const statusCode = error.satusCode || 400;

    return res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
};
