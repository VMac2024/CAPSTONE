"use strict";
const Models = require("../models");

//Find all comments:
/*const getComments = (req, res) => {
  const postId = req.params.postId;
  Models.Comment.findAll({
    where: { postId: postId },
    include: {
      model: Models.User,
      attributes: ["firstName"],
    },
  })
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};*/

//Find all comments associated with post:
const getCommentsbyPost = (postId, res) => {
  Models.Comment.findAll({
    where: { postId },
    include: {
      model: Models.User,
      attributes: ["firstName"],
    },
  })
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

//Create new comment:
const createComment = (data, res) => {
  Models.Comment.create(data)
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

//update posts:
const updateComment = (req, res) => {
  Models.Comment.update(req.body, { where: { id: req.params.id }, returning: true })
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

//delete users:
const deleteComment = (req, res) => {
  Models.Comment.destroy({ where: { id: req.params.id } })
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

module.exports = {
  //getComments,
  getCommentsbyPost,
  createComment,
  updateComment,
  deleteComment,
};
