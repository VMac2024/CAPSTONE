"use strict";
const Models = require("../../models");

//Find all projects:
const getProjects = (res) => {
  Models.Project.findAll({})
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

//Create new projects:
//CHECK CODE FOR CREATE NEW POST:
const createProject = (data, res) => {
  Models.Project.create(data)
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

//update projects:
const updateProject = (req, res) => {
  Models.Project.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

//delete project:
const deleteProject = (req, res) => {
  Models.Project.findByIdAndDelete(req.params.id)
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

module.exports = {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
};
