const express = require("express");
const Student = require("../../db/student");
const StudentAccount = require("../../db/studentAccount");
const Group = require("../../db/groups");
const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const students = await Student.findAll({
        include: [StudentAccount, Group],
      });

      res.send(students);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .post(async (req, res, next) => {
    try {
      const { email, password, firstName, lastName, groupId } = req.body;
      const stAcc = await StudentAccount.create({ email, password });
      const student = await stAcc.createStudent({
        firstName,
        lastName,
        groupId,
      });

      res.send(student);
    } catch (e) {
      console.log(e);
      next(e);
    }
  });

router
  .route("/:id")
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
      await StudentAccount.destroy({ where: { id: req.params.id } }).then(
        (rowsDeleted) => {
          if (rowsDeleted > 0) {
            res.send("deleted");
          }
        }
      );
    } catch (e) {
      console.log(e);
      next(e);
    }
  });

module.exports = router;
