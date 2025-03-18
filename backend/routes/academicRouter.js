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
const checkLogin = require("../middlewares/token/checkLogin");

// add class routes
router.post("/add-class", checkLogin, AddClass);

// add shift routes
router.post("/add-shift", checkLogin, AddShift);

// add section routes
router.post("/add-section", checkLogin, AddSection);

// add session routes
router.post("/add-session", checkLogin, AddSession);

// exports
module.exports = router;
