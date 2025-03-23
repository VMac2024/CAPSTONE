"use strict";
const Article = require("./article");
const Post = require("./post");
const Project = require("./project");
const User = require("./user");
const Comment = require("./comment");

async function init() {
  await User.sync();
  await Post.sync();
  await Project.sync();
  await Comment.sync();
  await Article.sync();
}

init();

module.exports = {
  User,
  Post,
  Project,
  Comment,
  Article,
};
