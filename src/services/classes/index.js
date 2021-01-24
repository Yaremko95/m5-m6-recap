const express = require("express");
const Class = require("../../db/classes");
const Teacher = require("../../db/teachers");
const Group = require("../../db/groups");
const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const classes = await Class.findAll({
        include: [
          { model: Teacher, through: { attributes: [] } },
          { model: Group, through: { attributes: [] } },
        ],
      });
      res.send(classes);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .post(async (req, res, next) => {
    try {
      const newClass = await Class.create(req.body);
      res.send(newClass);
    } catch (e) {
      console.log(e);
      next(e);
    }
  });
router.route("/:classId/:teacherId/teacher").post(async (req, res, next) => {
  try {
    const cl = await Class.findByPk(req.params.classId);
    await cl.addTeacher(req.params.teacherId);
    res.send(cl);
  } catch (e) {
    console.log(e);
    next(e);
  }
});
router.route("/:classId/:groupId/groups").post(async (req, res, next) => {
  try {
    const cl = await Class.findByPk(req.params.classId);
    await cl.addGroup(req.params.groupId);
    res.send(cl);
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
