const db = require("./index");
const { DataTypes, Sequelize } = require("sequelize");
const Class = db.define("class", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Class;
