const express = require("express");
const db = require("../../db");
const router = express.Router();

// const ex = {
//   firstname: "tetiana",
//   lastname: "yaremko",
//   group: { id: 1, name: "react" },
//   studentAccount: {
//     id: 1,
//     email: "sth",
//     password: "st",
//   },
// };
router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const query = `SELECT s.firstname, s.lastname, g.name as group, sa.password, sa.email
                      FROM students as s 
                      LEFT JOIN groups as g
                      ON s.group_id = g.id
                      LEFT JOIN public."studentAccount" as sa
                      ON s.student_acc_id = sa.id;`;
      const { rows } = await db.query(query);
      res.send(rows);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .post(async (req, res, next) => {
    try {
      const query = `INSERT INTO public.students(
                      firstname,  lastname, student_acc_id, group_id)
                      VALUES ($1, $2, $3, $4 );`;
      const result = await db.query(query, [
        req.body.firstname,
        req.body.lastname,
        req.body.studentAccountId,
        req.body.groupId,
      ]);
      res.send(result);
    } catch (e) {
      console.log(e);
      next(e);
    }
  });

router
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const query = `SELECT s.firstname, s.lastname, g.name as group, sa.password, sa.email
                      FROM students as s 
                      LEFT JOIN groups as g
                      ON s.group_id = g.id
                      LEFT JOIN public."studentAccount" as sa
                      ON s.student_acc_id = sa.id
                      WHERE s.id=$1`;
      const { rows } = await db.query(query, [req.params.id]);
      res.send(rows[0]);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .put(async (req, res, next) => {
    try {
      const fields = Object.keys(req.body)
        .map((key, i) => `${key}=$${i + 1}`)
        .join();

      const query = `UPDATE public.students
                      SET ${fields}
                      WHERE id= $${Object.keys(req.body).length + 1};`;

      const result = await db.query(query, [
        ...Object.values(req.body),
        req.params.id,
      ]);
      res.send(result);
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
