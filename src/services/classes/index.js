const express = require("express");
const db = require("../../db");
const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const query1 = `select *
                        from classes as c
                        left join group_classes as gc
                        on gc.class_id = c.id
                        left join students as s
                        on s.group_id=gc.group_id
                        left join teacher_classes as tc
                        on tc.class_id=c.id
                        left join teachers as t
                        on t.id = tc.teacher_id
                        left join groups as g 
                        on g.id=gc.group_id
`;
      const query2 = `select json_build_object('id', c.id, 
                     'name', c.name, 
                     'group', json_build_object('id', g.id, 
                     'name', g.name ), 
                     'teacher', json_build_object('id', t.id,
                    'firstName', t.firstname ,
                    'lastName', t.lastname 
                       ),
                      'student', json_build_object('id', s.id,
                        'firstName', s.firstname ,
                    'lastName', s.lastname 
                       )
                    ) as class
                    from classes as c
                    left join group_classes as gc
                    on gc.class_id = c.id
                    left join students as s
                    on s.group_id=gc.group_id
                    left join teacher_classes as tc
                    on tc.class_id=c.id
                    left join teachers as t
                    on t.id = tc.teacher_id
                    left join groups as g 
                    on g.id=gc.group_id
                    `;

      const query = `select s.student,  json_build_object('id', c.id, 
                      'name', c.name, 
                     'group', json_build_object('id', g.id, 
                      'name', g.name ), 
                     'teacher', json_build_object('id', t.id,
                    'firstName', t.firstname ,
                    'lastName', t.lastname 
                    )
                     )
                    from classes as c
                    left join group_classes as gc
                    on gc.class_id = c.id
                    left join  (SELECT group_id ,
                    json_agg(
                    json_build_object('id', id,
                    'firstName', firstname ,
                    'lastName', lastname 
                     )
                    ) as student
                    from students 
                    group by group_id
                    ) as s 
                    on s.group_id=gc.group_id
                    left join teacher_classes as tc
                    on tc.class_id=c.id
                    left join teachers as t
                    on t.id = tc.teacher_id
                    left join groups as g 
                    on g.id=gc.group_id;`;

      const { rows } = await db.query(query);
      const data = rows.map((row) => ({
        ...row.json_build_object,
        students: row.student,
      }));
      console.log(data);
      res.send(data);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .post(async (req, res, next) => {
    try {
      const query = `INSERT INTO public.classes(
                        name)
                        VALUES ($1);`;
      const result = await db.query(query, [req.body.name]);
      res.send(result);
    } catch (e) {
      console.log(e);
      next(e);
    }
  });
router.route("/:classId/:teacherId/teacher").post(async (req, res, next) => {
  try {
    const query = `INSERT INTO public.teacher_classes(
                    teacher_id, class_id)
                    VALUES ($1, $2);`;
    const result = await db.query(query, [
      req.params.teacherId,
      req.params.classId,
    ]);
    res.send(result);
  } catch (e) {
    console.log(e);
    next(e);
  }
});
router.route("/:classId/:groupId/groups").post(async (req, res, next) => {
  try {
    const query = `INSERT INTO public.group_classes(
                    group_id, class_id)
                    VALUES ($1, $2);`;
    const result = await db.query(query, [
      req.params.groupId,
      req.params.classId,
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
