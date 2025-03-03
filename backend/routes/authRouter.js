// external imports
const express = require('express');

const router = express.Router();

// internal imports
const { SignUP } = require('../controllers/authControllers');
const { signupValidator } = require('../middlewares/validators/authValidator');
const sanitization = require('../middlewares/validators/sanitization');

// internal imports

// user page
// add user
router.post('/signup', signupValidator, sanitization, SignUP);

module.exports = router;
