"use strict";
const Models = require("../models");

//Find all posts:
const getPosts = (res) => {
  Models.Post.findAll({})
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

//Create new posts:
//CHECK CODE FOR CREATE NEW POST:
const createPost = (req, res) => {
  console.log(req.body);
  console.log(req.file);
  const { title, content, category, userId } = req.body;
  const image = "/images/" + req.file.filename;
  Models.Post.create({
    title,
    content,
    image,
    category,
    userId,
  })
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

//update posts:
const updatePost = (req, res) => {
  const { title, content, category } = req.body;
  const image = req.file ? "/images/" + req.file.filename : null; // Only update image if a file is provided
  console.log("Update data:", { title, content, category, image });

  Models.Post.update({ title, content, category, image }, { where: { id: req.params.id }, returning: true })
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log("Error updating post:", err);
      res.send({ result: 500, error: err.message });
    });
};

//delete users:
const deletePost = (req, res) => {
  Models.Post.destroy({ where: { id: req.params.id } })
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

module.exports = {
  getPosts,
  createPost,
  updatePost,
  deletePost,
};
