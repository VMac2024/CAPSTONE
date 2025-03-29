//One Earth Community Collab

const express = require("express");
const app = express();
require("dotenv").config();

let dbConnect = require("./dbConnect");

app.use(express.json());

let userRoutes = require("./routes/userRoutes");
app.use("/api/user", userRoutes);

let articleRoutes = require("./routes/articlesRoutes");
app.use("/api/article", articleRoutes);

let commentRoutes = require("./routes/commentRoutes");
app.use("/api/comment", commentRoutes);

let postRoutes = require("./routes/postRoutes");
app.use("/api/post", postRoutes);

let projectRoutes = require("./routes/projectRoutes");
app.use("/api/project", projectRoutes);

const PORT = process.env.PORT || 8081;
console.log("PORT from env:", process.env.PORT);
app.listen(PORT, () => {
  console.log(`Server is running on port
${PORT}.`);
});
