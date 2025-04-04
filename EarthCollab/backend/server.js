//One Earth Community Collab

const express = require("express");
const app = express();
const dotenv = require("dotenv");
const environment = process.env.NODE_ENV || "local";

dotenv.config({ path: `./.env.${environment}` });

let dbConnect = require("./dbConnect");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let userRoutes = require("./routes/userRoutes");
app.use("/api/user", userRoutes);

let articleRoutes = require("./routes/articleRoutes");
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
