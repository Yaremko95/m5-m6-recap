const db = require("./index");
const { DataTypes, Sequelize } = require("sequelize");
const Exam = db.define("exam", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  mark: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Exam;
