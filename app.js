require("dotenv").config();
require("./config/db");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const routes = require("./routes/index");
const { seedAdmin } = require("./seeder/seeder");

app.use(express.json({ limit: "50mb" }));
app.use("/api", routes);

seedAdmin();

app.listen(port, () => {
  console.log(`listning port on http://localhost:${port}`);
});
