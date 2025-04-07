// 📌 Student Management Router

// 🔗 external imports

const express = require("express");

const router = express.Router();

// ⚙️ internal imports
const {
  addStudentInfo,
} = require("../controllers/student-management/studentInfoController");

// 📝 Student Information
router.post("/student-info", addStudentInfo);

// 🛠️ exports
module.exports = router;
