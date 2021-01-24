const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  {
    host: process.env.PGHOST,
    dialect: "postgres",
  }
);

//test connection
sequelize
  .authenticate()
  .then(() => console.log("Connection has been established"))
  .catch((e) => console.log("Unable to establish connection:", e));
