const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

exports.seedAdmin = async (req, res, next) => {
  try {
    const admin_email = process.env.ADMIN_EMAIL;
    const admin_password = process.env.ADMIN_PASSWORD;

    const user = await User.findOne({ email: admin_email });

    if (!user) {
      const hashPW = await bcrypt.hash(admin_password, 12);

      const seederAdmin = {
        userName: "admin",
        age: 22,
        gender: "male",
        email: admin_email,
        password: hashPW,
        role: "admin",
      };

      await User.create(seederAdmin);

      console.log("admin added successfully...!");
    } else {
      console.log("admin already exists successfully...!");
    }
  } catch (error) {
    console.log("failed to add admin...!", error.message);
  }
};
