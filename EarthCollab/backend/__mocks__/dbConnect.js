const { Sequelize } = require("sequelize");

// mock in-memory SQLite instance instead of running tests in the real database
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:",
  logging: false,
});

module.exports = { Sequelize: sequelize };
