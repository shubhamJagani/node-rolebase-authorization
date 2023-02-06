const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database connected successfully..!");
  })
  .catch((err) => {
    console.log(err.message);
  });
