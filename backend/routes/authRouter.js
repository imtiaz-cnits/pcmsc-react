// external imports
const express = require('express');

const router = express.Router();

// internal imports
const { SignUp } = require('../controllers/authControllers');
const {
  signupValidator,
  loginValidator,
} = require('../middlewares/validators/auth/authValidator');
const sanitization = require('../middlewares/validators/sanitization');
const { Login } = require('../controllers/authControllers');

// internal imports

// signup
router.post('/sign-up', signupValidator, sanitization, SignUp);

// login
router.post('/login', loginValidator, sanitization, Login);

// exports
module.exports = router;
