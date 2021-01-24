const db = require("./index");
const { DataTypes, Sequelize } = require("sequelize");
const StudentAccount = db.define("studentAccount", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = StudentAccount;
