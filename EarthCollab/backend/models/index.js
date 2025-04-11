"use strict";
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

const Article = require("./article");
const Post = require("./post");
const User = require("./user");
const Comment = require("./comment");

async function init() {
  await User.sync();
  await Post.sync();
  await Comment.sync();
  await Article.sync();
}

init();

User.hasMany(Post);
User.hasMany(Article);
User.hasMany(Comment);
Post.belongsTo(User);
Post.hasMany(Comment);
Comment.belongsTo(Post);
Comment.belongsTo(User);
Article.belongsTo(Article);

sequelizeInstance.sync();

module.exports = {
  User,
  Post,
  Comment,
  Article,
};
