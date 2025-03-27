const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

router.get("/", (req, res) => {
  Controllers.articleController.getArticles(res);
});

router.post("/create", (req, res) => {
  Controllers.articleController.createArticle(req.body, res);
});

router.put("/:id", (req, res) => {
  Controllers.articleController.updateArticle(req, res);
});

router.delete("/:id", (req, res) => {
  Controllers.articleController.deleteArticle(req, res);
});

module.exports = router;
