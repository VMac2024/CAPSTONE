const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");
const { uploadFile } = require("../middleware/uploads");

router.get("/", (req, res) => {
  Controllers.articleController.getArticles(res);
});

router.post("/create", uploadFile.single("file"), (req, res) => {
  Controllers.articleController.createArticle(req.body, req.file, res);
});

router.put("/:id", (req, res) => {
  Controllers.articleController.updateArticle(req, res);
});

router.delete("/:id", (req, res) => {
  Controllers.articleController.deleteArticle(req, res);
});

module.exports = router;
