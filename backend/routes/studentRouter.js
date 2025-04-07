// 📌 Student Management Router

// 🔗 external imports

const express = require("express");

const router = express.Router();

// ⚙️ internal imports
const {
  addStudentInfo,
  getAllStudents,
  deleteStudent,
  updateStudent,
} = require("../controllers/student-management/studentInfoController");

// 🚀  Student Information - CRUD
router.post("/student-info", addStudentInfo);
router.get("/students", getAllStudents);
router.patch("/student/:id", updateStudent);
router.delete("/student/:id", deleteStudent);

// 🛠️ exports
module.exports = router;
