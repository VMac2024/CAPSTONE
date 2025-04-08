"use strict";
const { createToken } = require("../middleware/auth");
const Models = require("../models");
const bcrypt = require("bcryptjs");

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
/*const createUser = (data, res) => {
  Models.User.create(data)
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};*/

//Create token: - see middleware - jsonwebtoken - see Jo's code.

//Create new user - ("registration") - public facing route.
const createUser = async (req, res) => {
  try {
    const { firstName, lastName, emailId, password, location, expertise } = req.body;
    console.log(req.body);

    if (!(emailId && password && firstName && lastName && location && expertise)) {
      return res.status(400).json({ result: "All fields must be completed" });
    }

    //check if already signed up:
    const existingUser = await Models.User.findOne({ where: { emailId } });
    if (existingUser) {
      return res.status(409).json({ result: "User already exists. Please login" });
    }

    const accessMap = {
      Enthusiast: "User",
      Professional: "Contributor",
    };

    const accessLevel = accessMap[expertise];
    if (!accessLevel) {
      return res.status(400).json({ result: "Invalid expertise level" });
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
};

//Login users:
const loginUser = async (req, res) => {
  try {
    //obtain user input from frontend:
    const { emailId, password } = req.body;

    if (!(emailId && password)) {
      return res.status(400).json({ result: "Both Email and Password required " });
    }

    const user = await Models.User.findOne({ raw: true, where: { emailId: emailId } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = createToken(user.id, emailId);
      user.token = token;
      console.log(user);

      return res.status(200).json({ result: "User logged in", data: user });
    } else return res.status(400).json({ result: "Invalid user credentials" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ result: err.message });
  }
};

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
  loginUser,
  updateUser,
  deleteUser,
};
