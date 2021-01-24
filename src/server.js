const express = require("express");
require("dotenv").config();
const db = require("./db");
const Student = require("./db/student");
const StudentAccount = require("./db/studentAccount");
const Group = require("./db/groups");
const Class = require("./db/classes");
const Exam = require("./db/exams");
const Teacher = require("./db/teachers");
const studentRouter = require("./services/students");
const classRouter = require("./services/classes");
const examsRouter = require("./services/exams");
//1:1
StudentAccount.hasOne(Student, { onDelete: "cascade" });
Student.belongsTo(StudentAccount, { onDelete: "cascade" });
//1:m
Student.belongsTo(Group);
Group.hasMany(Student);
//m:n
Group.belongsToMany(Class, { through: "groupClass", timestamps: false });
Class.belongsToMany(Group, { through: "groupClass", timestamps: false });

Class.belongsToMany(Teacher, { through: "teacherClass", timestamps: false });
Teacher.belongsToMany(Class, { through: "teacherClass", timestamps: false });

Exam.belongsToMany(Student, { through: "examStudent", timestamps: false });
Student.belongsToMany(Exam, { through: "examStudent", timestamps: false });

Exam.belongsToMany(Teacher, { through: "examTeacher", timestamps: false });
Teacher.belongsToMany(Exam, { through: "examTeacher", timestamps: false });

Exam.belongsTo(Class);
Class.hasMany(Exam);
const server = express();

const cors = require("cors");

server.use(cors());

server.use(express.json());

server.use("/students", studentRouter);
server.use("/classes", classRouter);
server.use("/exams", examsRouter);
db.sync().then((result) => {
  server.listen(process.env.PORT || 3002, () =>
    console.log("Running on port " + process.env.PORT)
  );
});
