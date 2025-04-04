"use strict";
const Models = require("../models");
const path = require("path");

//Find all articles:
const getArticles = (res) => {
  Models.Article.findAll({})
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

//Create new articles:
//CHECK CODE FOR CREATE NEW ARTICLE:
const createArticle = (req, res) => {
  console.log(req.body); //check body data.
  console.log(req.file); //check file name.
  const { title, description, category } = req.body;
  const pdfLink = "/public/pdfs/" + req.file.filename;
  Models.Article.create({
    title,
    pdfLink,
    description,
    category,
  })
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

//update articles:
const updateArticle = (req, res) => {
  Models.Article.update(req.body, { where: { id: req.params.id }, returning: true })
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

//delete articles:
const deleteArticle = (req, res) => {
  Models.Article.destroy({ where: { id: req.params.id } })
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

module.exports = {
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
};

// ADD FIND ARTICLES BY USER
