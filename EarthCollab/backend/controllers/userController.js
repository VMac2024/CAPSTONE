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

//Create new users - Admin Route:
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

/*Create new user - ("registration") - public facing route.
const createUser = async (req, res) => {
  
  try {
    const { firstName, lastName, emailId, password, accessLevel, location, expertise } = req.body;

    if (!(emailId && password && firstName && lastName && accessLevel && location && expertise)) {
      return res.status(400).json({ result: "All fields must be completed" });
    }

    //check if already signed up:
    const existingUser = await Models.User.findOne({ where: { emailId } });
    if (existingUser) {
      return res.status(409).json({ result: "User already exists. Please login" });
    }
    let encrytpedPassword = await bcrypt.hash(password, 10);

    const newUser = await Models.User.create({
      firstName,
      lastName,
      emailId: emailId.toLowerCase(),
      password: encrytpedPassword,
      accessLevel,
      location,
      expertise,
    });
    const user = newUser.get({ plain: true });

    return res.status(201).json({ result: "New user registered", data: user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ result: err.message });
  }
};*/

//update users:
const updateUser = (req, res) => {
  Models.User.update(req.body, { where: { id: req.params.id }, returning: true })
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
  Models.User.destroy({ where: { id: req.params.id } })
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

//CREATE USER TOKEN WITH TIMEOUT LIMIT.

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
