const db = require("./index");
const { DataTypes, Sequelize } = require("sequelize");
const Group = db.define("group", {
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

module.exports = Group;
