const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Teacher = require("./Teacher");

const Group = sequelize.define(
  "Group",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    teacherId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Teacher,
        key: "id",
      },
    },
  },
  {
    tableName: "groups",
    timestamps: true,
  }
);

Teacher.hasMany(Group, { foreignKey: "teacherId", onDelete: "CASCADE" });
Group.belongsTo(Teacher, { foreignKey: "teacherId" });

module.exports = Group;
