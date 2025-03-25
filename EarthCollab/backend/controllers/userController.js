"use strict";
const Models = require("../models");

//Find all users:
const getUsers = (res) => {
  Models.User.findAll({})
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

//Create new users:
//CHECK CODE FOR CREATE NEW USER:
const createUser = (data, res) => {
  Models.User.create(data)
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

//Create token: - see middleware - jsonwebtoken - see Jo's code.

//update users:
const updateUser = (req, res) => {
  Models.User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

//delete users:
const deleteUser = (req, res) => {
  Models.User.findByIdAndDelete(req.params.id)
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

//CREATE USER TOKEN WITH TIMEOUT LIMIT.
//CHECK THAT THE USER DOESN'T ALREADY HAVE AN ACCOUNT - IF THEY ALREADY HAVE ONE, THEY ARE GIVEN AN ERROR. IF NOT, THEN THEY PROCEED WITH REGISTERING.
//bcrypt.js - npm  install bcrypt.js.
//convert emails to lowercase.

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
