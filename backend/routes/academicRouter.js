// external imports
const express = require("express");

const router = express.Router();

// internal imports
const {
  AddClass,
  AddShift,
  AddSession,
  AddSection,
} = require("../controllers/academicController");

// add class routes
router.post("/add-class", AddClass);

// add shift routes
router.post("/add-shift", AddShift);

// add section routes
router.post("/add-section", AddSection);

// add session routes
router.post("/add-session", AddSession);

// exports
module.exports = router;
