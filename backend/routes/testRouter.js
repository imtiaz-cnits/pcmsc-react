// External imports
const express = require('express');

// internal imports
const router = express.Router();

// import required modules
const multer = require('multer');

// File upload folder

const UPLOADS_FOLDER = '../../uploads/';

// prepare the final multer upload object

const upload = multer({
  dest: UPLOADS_FOLDER,
});

router.post('/', upload.single('avatar'), async (req, res) => {
  return res.send('file uploaded');
});

module.exports = router;
