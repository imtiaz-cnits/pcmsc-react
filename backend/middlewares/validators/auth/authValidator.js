// 🔗 External imports
const { check } = require('express-validator');

// 🛠️ User Signup Validation Logic

const signupValidator = [
  check('name')
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name should be a String')
    .trim()
    .isLength({ min: 4 })
    .withMessage('Name must be at least 4 characters long')
    .isLength({ max: 31 })
    .withMessage('Name must not exceed 31 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name should only contain alphabets and spaces'),

  check('username')
    .notEmpty()
    .withMessage('Username is required')
    .isString()
    .withMessage('Username must be a String')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long')
    .isLength({ max: 31 })
    .withMessage('Username must not be more than 31 characters long')
    .matches(/^[a-zA-Z0-9]+$/)
    .withMessage('Username must contain only letters and numbers')
    .not()
    .contains(' ')
    .withMessage('Username should not contain spaces'),

  check('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail(),

  check('mobile')
    .notEmpty()
    .withMessage('Phone Number is required')
    .matches(/^(?:\+88)?(013|014|015|016|017|018|019)\d{8}$/)
    .withMessage('Invalid Phone number'),

  check('password')
    .notEmpty()
    .withMessage('Password is required.')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    )
    .withMessage(
      'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character (@, $, !, %, *, ?, &).',
    )
    .custom((value) => {
      const weakpasswordRegex = /^(?=[a-zA-Z0-9]*$).{6,}$/;
      if (weakpasswordRegex.test(value)) {
        throw new Error('Password is too weak. Try using a mix of characters.');
      }
      return true;
    }),

  check('imgURL').optional().isURL().withMessage('Invalid image URL format'),

  check('status')
    .optional()
    .isIn(['active', 'inactive'])
    .withMessage('Status must be either active or inactive'),

  check('role')
    .optional()
    .isIn(['user', 'admin'])
    .withMessage('Role must be either user or admin'),

  check('OTP').optional().isString().withMessage('OTP should be a string'),
];

const loginValidator = [
  check('username')
    .notEmpty()
    .withMessage('Username required')
    .isString()
    .withMessage('Username should be a string')
    .trim(),

  check('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email should be a valid email address')
    .trim(),

  check('password').notEmpty().withMessage('Password is required'),
];

// 🚀 Export Model for External Usage
module.exports = { signupValidator, loginValidator };
