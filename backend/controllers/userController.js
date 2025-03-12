// external imports
const express = require('express');

const router = express.Router();
const createError = require('http-errors');

// 📦 Internal imports (if any)
const Auth = require('../models/authModel');

// Get all users

// Get user by ID or email

router.get('/user-by-username', async (req, res, next) => {
  const { email } = req.body;

  // is exists user
  const existingUser = await Auth.findOne({ email });

  if (!existingUser) {
    const field = existingUser.email === 'email' ? 'email' : 'phone';
    return next(createError(409, `${field} already exists`));
  }

  return res.status(200).json({
    successs: true,
    data: existingUser,
    message: 'user based on email or phone or username',
  });
});

// Create user

// Update user

// Delete user
