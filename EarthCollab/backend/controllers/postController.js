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
const updatePost = async (req, res) => {
  const { title, content, category } = req.body;
  const image = req.file ? "/images/" + req.file.filename : null; // Only update image if a file is provided
  console.log("Update data:", { title, content, category, image });
  const updateData = { title, content, category };
  if (image) updateData.image = image;
  try {
    const [rowsUpdated] = await Models.Post.update(updateData, { where: { id: req.params.id } });
    console.log(rowsUpdated);
    if (rowsUpdated > 0) {
      const updatedPost = await Models.Post.findByPk(req.params.id);
      return res.status(200).json({ result: 200, data: updatedPost });
    }
    return res.json({ result: 404 });
  } catch (err) {
    console.log("Error updating post:", err);
    res.send({ result: 500, error: err.message });
  }
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
