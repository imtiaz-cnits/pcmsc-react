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

// 🚀  Exam Type - CRUD
router.post("/add-exam-type", addExamType);
router.get("/exam-types", getAllExamType);
router.get("/exam-types-paginated", getAllPaginatedExamTypes);
router.patch("/exam-type/:id", updateExamTypes);
router.delete("/exam-type/:id", deleteExamTypes);

// 🛠️ exports
module.exports = router;
