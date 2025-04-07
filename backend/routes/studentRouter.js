// 📌 Student Management Router

// 🔗 external imports

const express = require("express");

const router = express.Router();

// ⚙️ internal imports
const {
  addStudentInfo,
  getAllStudents,
} = require("../controllers/student-management/studentInfoController");

// 📝 Student Information
router.post("/student-info", addStudentInfo);
router.get("/students", getAllStudents);

// 🛠️ exports
module.exports = router;
