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
} = require("../controllers/exam-management/subjectController");

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
router.patch("/update-exam-types/:id", updateExamTypes);
router.delete("/subject/:id", deleteSubject);

// 🛠️ exports
module.exports = router;
