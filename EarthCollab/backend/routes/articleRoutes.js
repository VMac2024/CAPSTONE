const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");
const { uploadFile } = require("../middleware/uploads");
const { verifyToken } = require("../middleware/auth");

router.get("/", (req, res) => {
  Controllers.articleController.getArticles(res);
});

router.post("/create", verifyToken, uploadFile, (req, res) => {
  Controllers.articleController.createArticle(req, res);
});

router.put("/:id", (req, res) => {
  Controllers.articleController.updateArticle(req, res);
});

router.delete("/:id", (req, res) => {
  Controllers.articleController.deleteArticle(req, res);
});

module.exports = router;
