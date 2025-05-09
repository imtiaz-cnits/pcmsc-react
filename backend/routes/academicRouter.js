// external imports
const express = require("express");

const router = express.Router();

// internal imports
const {
  addClass,
  getAllClasses,
  updateClass,
  deleteClass,
  getAllPaginatedClasses,
} = require("../controllers/academicManagement/classController");
const {
  addShift,
  getAllShift,
  getAllShiftsPagination,
  deleteShift,
  updateShift,
} = require("../controllers/academicManagement/shiftController");
const {
  addSection,
  getAllPaginatedSections,
  deleteSection,
  updateSection,
  getAllSections,
} = require("../controllers/academicManagement/sectionController");
const {
  addSession,
  updateSession,
  deleteSession,
  getAllPaginatedSession,
  getAllEntriesSession,
  getAllSession,
} = require("../controllers/academicManagement/sessionController");
const {
  addGroup,
  getAllGroups,
  deleteGroup,
  updateGroup,
  getAllPaginatedGroups,
} = require("../controllers/academicManagement/groupController");

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
router.patch("/shift/:id", updateShift);
router.delete("/shift/:id", deleteShift);

// ⚙️ Section - CRUD
router.post("/add-section", addSection);
router.get("/sections", getAllSections);
router.get("/section-paginated", getAllPaginatedSections);
router.patch("/section/:id", updateSection);
router.delete("/section/:id", deleteSection);

// 🚀 Session - CRUD
router.post("/add-session", addSession);
router.get("/sessions", getAllSession);
router.get("/session-paginated", getAllPaginatedSession);
router.get("/session-entries", getAllEntriesSession);
router.patch("/session/:id", updateSession);
router.delete("/session/:id", deleteSession);

// 🚀 Group - CRUD
router.post("/add-group", addGroup);
router.get("/groups", getAllGroups);
router.get("/group-paginated", getAllPaginatedGroups);
router.patch("/group/:id", updateGroup);
router.delete("/group/:id", deleteGroup);

// exports
module.exports = router;
