const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

router.get("/", (req, res) => {
  Controllers.projectController.getProjects(res);
});

router.post("/create", (req, res) => {
  Controllers.projectController.createProject(req.body, res);
});

router.put("/:id", (req, res) => {
  Controllers.projectController.updateProject(req, res);
});

router.delete("/:id", (req, res) => {
  Controllers.projectController.deleteProject(req, res);
});

module.exports = router;
