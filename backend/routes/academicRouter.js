// external imports
const express = require("express");

const router = express.Router();

// internal imports
const {
  AddShift,
  AddSession,
  AddSection,
} = require("../controllers/academicController");
const {
  addClass,
  getAllClasses,
  updateClass,
  deleteClass,
} = require("../controllers/academicManagement/classController");

// 🔍 Class - CRUD
router.post("/add-class", addClass);
router.get("/classes", getAllClasses);
router.patch("/classes/:id", updateClass);
router.delete("/classes/:id", deleteClass);

// 📝 Shift - CRUD

// ⚙️ Section - CRUD

// 🚀 Session - CRUD

// add shift routes
router.post("/add-shift", AddShift);

// add section routes
router.post("/add-section", AddSection);

// add session routes
router.post("/add-session", AddSession);

// exports
module.exports = router;
