const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

router.get("/", (req, res) => {
  Controllers.postController.getComments(res);
});

router.post("/create", (req, res) => {
  Controllers.postController.createComment(req.body, res);
});

router.put("/:id", (req, res) => {
  Controllers.postController.updateComment(req, res);
});

router.delete("/:id", (req, res) => {
  Controllers.postController.deleteComment(req, res);
});

module.exports = router;
