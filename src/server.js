const express = require("express");
require("dotenv").config();
const studentRouter = require("./services/students");
const classRouter = require("./services/classes");
const server = express();

const cors = require("cors");

server.use(cors());

server.use(express.json());

server.use("/students", studentRouter);
server.use("/classes", classRouter);
server.listen(process.env.PORT || 3002, () =>
  console.log("Running on port " + process.env.PORT)
);
