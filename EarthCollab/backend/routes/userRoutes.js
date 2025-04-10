const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");
const { verifyToken } = require("../middleware/auth");

router.get("/", verifyToken, (req, res) => {
  Controllers.userController.getUsers(res);
});

router.post("/create", (req, res) => {
  Controllers.userController.createUser(req, res);
});

router.post("/login", (req, res) => {
  Controllers.userController.loginUser(req, res);
});

router.put("/:id", (req, res) => {
  Controllers.userController.updateUser(req, res);
});

router.delete("/:id", (req, res) => {
  Controllers.userController.deleteUser(req, res);
});

module.exports = router;
