// 📌 Exam Management -  Router

const express = require("express");

const router = express.Router();

// ⚙️ internal imports
const {
  addExamType,
  getAllExamType,
  getAllPaginatedExamTypes,
  updateExamTypes,
  deleteExamTypes,
} = require("../controllers/exam-management/examTypeController");
const {
  addSubject,
  getAllSubjects,
  getAllPaginatedSubjects,
  deleteSubject,
  updateSubject,
} = require("../controllers/exam-management/subjectController");
const {
  getMigratedStudents,
  migrateStudent,
} = require("../controllers/exam-management/migrationController");

// 🚀  Exam Type - CRUD
router.post("/add-exam-type", addExamType);
router.get("/exam-types", getAllExamType);
router.get("/exam-types-paginated", getAllPaginatedExamTypes);
router.patch("/exam-type/:id", updateExamTypes);
router.delete("/exam-type/:id", deleteExamTypes);

// 🚀  Subject List - CRUD
router.post("/add-subject", addSubject);
router.get("/subjects", getAllSubjects);
router.get("/subjects-paginated", getAllPaginatedSubjects);
router.patch("/update-subject/:id", updateSubject);
router.delete("/subject/:id", deleteSubject);

// 🚀  Student Migration - CRUD
router.post("/migrate-student", migrateStudent);
router.get("/student-id", getMigratedStudents);

// 🛠️ exports
module.exports = router;
