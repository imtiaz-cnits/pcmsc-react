// external imports
const express = require('express');

const router = express.Router();

// internal imports
const { SignUp } = require('../controllers/authController');
const {
  signupValidator,
  loginValidator,
} = require('../middlewares/validators/auth/authValidator');
const sanitization = require('../middlewares/validators/sanitization');
const { Login } = require('../controllers/authController');
const checkLogin = require('../middlewares/token/checkLogin')

// internal imports

// signup
router.post('/sign-up', ...signupValidator, sanitization, SignUp);

// login
router.post('/login', ...loginValidator, sanitization, Login);

router.get('/',checkLogin)

// exports
module.exports = router;
