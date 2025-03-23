const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;
class Article extends Model {}
// Sequelize will create this table if it doesn't exist on startup
Article.init(
  {
    id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    pdfLink: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false, unique: true },
    category: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "articles", // use lowercase plural format
    timestamps: true,
    freezeTableName: true,
  }
);
module.exports = Article;
