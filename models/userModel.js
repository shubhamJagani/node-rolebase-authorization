const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    type: String,
  },
  gender: {
    type: String,
  },
  age: {
    type: Number,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  role : {
    type: String,
    default : "user"
  }
});

const user = mongoose.model("user", userSchema);
module.exports = user;
