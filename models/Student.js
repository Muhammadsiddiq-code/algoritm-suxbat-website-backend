const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Group = require("./Group");

const Student = sequelize.define(
  "Student",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Group,
        key: "id",
      },
    },
  },
  {
    tableName: "students",
    timestamps: true,
  }
);

Group.hasMany(Student, { foreignKey: "groupId", onDelete: "CASCADE" });
Student.belongsTo(Group, { foreignKey: "groupId" });

module.exports = Student;
