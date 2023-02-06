const User = require("../models/userModel");

exports.getAllUser = async (req, res, next) => {
  try {
    const user = await User.find();

    return res.status(200).json({
      success: true,
      result: user,
      message: "users get successfully..!",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};



exports.getUserbyID = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      const error = new Error("user not found..!");
      error.statusCode = 404;
      throw error;
    }

    return res.status(200).json({
      success: true,
      result: user,
      message: "user get successfully..!",
    });
  } catch (error) {
    const statusCode = error.statusCode || 400;
    return res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      const error = new Error("user not found..!");
      error.statusCode = 404;
      throw error;
    }

    user.userName = req.body.userName;
    user.gender = req.body.gender;
    user.age = req.body.age;
    user.email = req.body.email;

    if(req.body.password){
        const error = new Error("The server has not found anything matching the URI given");
        error.statusCode = 404;
        throw error;
    }

    const updatedUser = await user.save()

    return res.status(200).json({
      success: true,
      result: updatedUser,
      message: "users updated successfully..!",
    });
  } catch (error) {
    const statusCode = error.statusCode || 400;
    return res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      const error = new Error("user not found..!");
      error.statusCode = 404;
      throw error;
    }

    const deletdUser = await user.remove()

    return res.status(200).json({
      success: true,
      result: deletdUser,
      message: "users delete successfully..!",
    });
  } catch (error) {
    const statusCode = error.statusCode || 400;
    return res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
};
