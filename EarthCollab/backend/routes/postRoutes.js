const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");
const { imageUpload } = require("../middleware/imageUpload");

router.get("/", (req, res) => {
  Controllers.postController.getPosts(res);
});

router.post("/create", imageUpload, (req, res) => {
  Controllers.postController.createPost(req, res);
});

router.put("/:id", (req, res) => {
  Controllers.postController.updatePost(req, res);
});

router.delete("/:id", (req, res) => {
  Controllers.postController.deletePost(req, res);
});

module.exports = router;
