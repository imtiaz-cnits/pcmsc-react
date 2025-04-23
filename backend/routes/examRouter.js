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
  getAllPaginatedMigrations,
  deleteMigrationStudent,
} = require("../controllers/exam-management/migrationController");
const {
  addGradingSystem,
  getAllPaginatedGrades,
} = require("../controllers/exam-management/gradeController");

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
router.get("/paginated-student-migrations", getAllPaginatedMigrations);
router.delete("/migrate-student/:id", deleteMigrationStudent);

// 🚀  Grade List - CRUD
router.post("/add-grading-system", addGradingSystem);
router.get("/grading-system-paginated", getAllPaginatedGrades);
// 🛠️ exports
module.exports = router;
