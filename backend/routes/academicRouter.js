// external imports
const express = require("express");

const router = express.Router();

// internal imports
const {
  addClass,
  getAllClasses,
  updateClass,
  deleteClass, getAllPaginatedClasses,
} = require("../controllers/academicManagement/classController");
const {
  addShift,
  getAllShift,
  getAllShiftsPagination,
  deleteShift,
  updateShift,
  getAllShiftsEntries,
} = require("../controllers/academicManagement/shiftController");
const {
  addSection,
} = require("../controllers/academicManagement/sectionController");
const {
  addSession,
  getAllSessions,
  updateSession,
  deleteSession,
  getAllPaginatedSession,
} = require("../controllers/academicManagement/sessionController");

// 🔍 Class - CRUD
router.post("/add-class", addClass);
router.get("/classes", getAllClasses);
router.get("/class-paginated", getAllPaginatedClasses);
router.patch("/class/:id", updateClass);
router.delete("/class/:id", deleteClass);

// 📝 Shift - CRUD
router.post("/add-shift", addShift);
router.get("/shifts", getAllShift);
router.get("/shifts-paginated", getAllShiftsPagination);
router.get("/shifts-entries", getAllShiftsEntries);
router.patch("/shift/:id", updateShift);
router.delete("/shift/:id", deleteShift);

// ⚙️ Section - CRUD
router.post("/add-section", addSection);

// 🚀 Session - CRUD
router.post("/add-session", addSession);
router.get("/sessions", getAllSessions);
router.get("/session-paginated", getAllPaginatedSession);
router.patch("/session/:id", updateSession);
router.delete("/session/:id", deleteSession);

// exports
module.exports = router;
