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
const {
  addShift,
  getAllShift,
  getAllShiftsPagination,
} = require("../controllers/academicManagement/shiftController");

// 🔍 Class - CRUD
router.post("/add-class", addClass);
router.get("/classes", getAllClasses);
router.patch("/class/:id", updateClass);
router.delete("/class/:id", deleteClass);

// 📝 Shift - CRUD
router.post("/add-shift", addShift);
router.get("/shifts", getAllShift);
router.get("/shifts-paginated", getAllShiftsPagination);

// ⚙️ Section - CRUD

// 🚀 Session - CRUD

// add shift routes

// add section routes
router.post("/add-section", AddSection);

// add session routes
router.post("/add-session", AddSession);

// exports
module.exports = router;
