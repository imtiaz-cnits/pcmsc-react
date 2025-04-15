// external imports
const express = require("express");

const router = express.Router();

const {
  getAllTest,
  getAllPaginatedTest,
} = require("../../controllers/test/testController");
router.get("/", getAllTest);
router.get("/test-paginated", getAllPaginatedTest);

module.exports = router;
