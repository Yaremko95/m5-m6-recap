const express = require("express");
const Class = require("../../db/classes");
const Teacher = require("../../db/teachers");
const Student = require("../../db/student");
const Exam = require("../../db/exams");
const Group = require("../../db/groups");
const StudentAccount = require("../../db/studentAccount");
const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const exams = await Exam.findAll({
        include: [
          Class,
          { model: Teacher, through: { attributes: [] } },
          {
            model: Student,
            include: [Group, StudentAccount],
            through: { attributes: [] },
          },
        ],
      });
      res.send(exams);
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
router.route("/:classId/:teacherId/:studentId").post(async (req, res, next) => {
  try {
    const exam = await Exam.create({
      mark: req.body.mark,
      classId: req.params.classId,
    });
    await exam.addStudent(req.params.studentId);
    await exam.addTeacher(req.params.teacherId);
    res.send(exam);
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
    } catch (e) {
      console.log(e);
      next(e);
    }
  });

module.exports = router;
