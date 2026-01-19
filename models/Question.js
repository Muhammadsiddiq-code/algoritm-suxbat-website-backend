const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Category = require("./Category");

const Question = sequelize.define(
  "Question",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Category,
        key: "id",
      },
    },
  },
  {
    tableName: "questions",
    timestamps: true,
  }
);

Category.hasMany(Question, { foreignKey: "categoryId", onDelete: "CASCADE" });
Question.belongsTo(Category, { foreignKey: "categoryId" });

module.exports = Question;
