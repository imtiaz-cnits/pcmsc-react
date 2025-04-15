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
  getStudentByID,
} = require("../controllers/student-management/studentInfoController");
const avatarUpload = require("../middlewares/upload/students/avatarUpload");

// 🚀  Student Information - CRUD
router.post("/student-info", avatarUpload, addStudentInfo);
router.get("/students", getAllStudents);
router.get("/student/:id", getStudentByID);
router.patch("/student/:id", avatarUpload, updateStudent);
router.delete("/student/:id", deleteStudent);

// 🛠️ exports
module.exports = router;
