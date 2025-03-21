const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;
class Project extends Model {}
// Sequelize will create this table if it doesn't exist on startup
Project.init(
  {
    id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
    projectName: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    location: { type: DataTypes.STRING, allowNull: false, unique: true },
    volunteer: { type: DataTypes.STRING, allowNull: false },
    webpage: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "projects", // use lowercase plural format
    timestamps: true,
    freezeTableName: true,
  }
);
module.exports = Project;
