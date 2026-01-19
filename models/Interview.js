const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Teacher = require("./Teacher");
const Category = require("./Category");

const Interview = sequelize.define(
  "Interview",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    teacherId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Teacher,
        key: "id",
      },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Category,
        key: "id",
      },
    },
    studentFullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    foundCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalQuestions: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
    },
    percentage: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    interviewDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "interviews",
    timestamps: true,
  }
);

Teacher.hasMany(Interview, { foreignKey: "teacherId", onDelete: "CASCADE" });
Interview.belongsTo(Teacher, { foreignKey: "teacherId" });

Category.hasMany(Interview, { foreignKey: "categoryId", onDelete: "CASCADE" });
Interview.belongsTo(Category, { foreignKey: "categoryId" });

module.exports = Interview;
