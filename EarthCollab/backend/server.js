//One Earth Community Collab

const express = require("express");
const app = express();
require("dotenv").config();

let dbConnect = require("./dbConnect");

let userRoutes = require("./routes/userRoutes");
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 8081;
console.log("PORT from env:", process.env.PORT);
app.listen(PORT, () => {
  console.log(`Server is running on port
${PORT}.`);
});
