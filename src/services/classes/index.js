const express = require("express");

const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
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
router.route("/:classId/:teacherId/teacher").post(async (req, res, next) => {
  try {
  } catch (e) {
    console.log(e);
    next(e);
  }
});
router.route("/:classId/:groupId/groups").post(async (req, res, next) => {
  try {
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
