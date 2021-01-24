const express = require("express");
const db = require("../../db");
const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const query = "SELECT * FROM students";
      const result = await db.query(query);
      res.send(result);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .post(async (req, res, next) => {
    try {
    } catch (e) {
      console.log(e);
      next(e);
    }
  });

router
  .route(":/id")
  .get(async (req, res, next) => {
    try {
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .put(async (req, res, next) => {
    try {
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .delete(async (req, res, next) => {
    try {
    } catch (e) {
      console.log(e);
      next(e);
    }
  });

module.exports = router;