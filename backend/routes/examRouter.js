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
  deleteGrade,
  getAllGrades,
  updateGrading,
} = require("../controllers/exam-management/gradeController");

const {
  addExam,
  getAllAssignedExam,
  getAllPaginatedAssignedExams,
  deleteAssignExam,
  updateAssignedExam,
} = require("../controllers/exam-management/examAssignController");
const {
  searchEligibleStudents,
  markEntry,
  fetchEntryMark,
} = require("../controllers/exam-management/markEntryController");
const {
  getResult,
} = require("../controllers/exam-management/resultController");
const {
  getMarkSheet,
  getEligibleStudent,
  getHighestMark,
} = require("../controllers/exam-management/markSheetController");
const { getGTBSheet } = require("../controllers/exam-management/gtbController");
const {
  getGenaratedAdmitCard,
} = require("../controllers/exam-management/admitCardController");

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
router.get("/grading-system-paginated", getAllGrades);
router.patch("/grading-system/:id", updateGrading);
router.delete("/grading-system/:id", deleteGrade);

// 🚀  Exam Assign To Class  List - CRUD
router.post("/assigned-exam", addExam);
router.get("/all-assigned-exams", getAllAssignedExam);
router.get("/assigned-exams-paginated", getAllPaginatedAssignedExams);
router.patch("/assigned-exam/:id", updateAssignedExam);
router.delete("/assigned-exam/:id", deleteAssignExam);

// 🚀  Mark Entry
router.get("/students/search", searchEligibleStudents);
router.post("/students/entry-mark", markEntry);
router.get("/marks", fetchEntryMark);

// 🚀  Result
router.get("/students/result/search", getResult);

// 🚀  Mark Sheet
router.get("/students/result/mark-sheet", getMarkSheet);
router.get("/students/result/mark-sheet/eligible-student", getEligibleStudent);
router.get("/students/result/mark-sheet/mark-student", getHighestMark);

// 🚀  GTB Sheet
router.get("/students/result/all/gtb-sheet", getGTBSheet);

// 🚀  Admit Card
router.get("/students/result/all/generated/admit-card", getGenaratedAdmitCard);

// 🛠️ exports
module.exports = router;
