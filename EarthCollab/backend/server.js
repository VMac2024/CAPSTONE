//One Earth Community Collab

const express = require("express");
const app = express();
const dotenv = require("dotenv");
const environment = process.env.NODE_ENV || "local";
const path = require("path");
const cors = require("cors");

dotenv.config({ path: `./.env.${environment}` });

let dbConnect = require("./dbConnect");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = { origin: "http://localhost:5173" };
app.use(cors(corsOptions)); //enable CORS for all routes.

app.use("/images", express.static("/images"));
//app.use("/pdfs", express.static("public/pdfs"));
app.use("/pdfs", express.static(path.join(__dirname, "./public/pdfs"))); //path for pdf files.

let userRoutes = require("./routes/userRoutes");
app.use("/api/user", userRoutes);

let articleRoutes = require("./routes/articleRoutes");
app.use("/api/article", articleRoutes);

let commentRoutes = require("./routes/commentRoutes");
app.use("/api/comment", commentRoutes);

let postRoutes = require("./routes/PostRoutes"); //check - is refusing a LC "p".
app.use("/api/post", postRoutes);

let projectRoutes = require("./routes/projectRoutes");
app.use("/api/project", projectRoutes);

const PORT = process.env.PORT || 8081;
console.log("PORT from env:", process.env.PORT);
app.listen(PORT, () => {
  console.log(`Server is running on port
${PORT}.`);
});
