// external imports
const express = require('express');

const router = express.Router();

// internal imports

// user page
// add user

router.post('/signup', (req, res) => {
  console.log(req.body);
});
