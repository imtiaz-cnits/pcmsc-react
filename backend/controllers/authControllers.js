// 🔗 External imports
const bcrypt = require('bcrypt');

// 📦 Internal imports (if any)
const Auth = require('../models/authModel');

// 📝 Signup function
const SignUP = async (req, res) => {
  try {
    const {
      name,
      username,
      email,
      mobile,
      password,
      imgURL,
      status,
      role,
      OTP,
    } = req.body;

    // 🔍 Check if user already exists
    // const existingUser = await Auth.findOne({ email });
    // if (existingUser) {
    //   return res.status(400).json({
    //     status: 'error',
    //     message: 'Email already in use',
    //   });
    // }

    // check username is already exists

    // 📧 Email validation
    // const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    // if (!emailRegex.test(email)) {
    //   return res
    //     .status(400)
    //     .json({ status: 'error', message: 'Invalid email format' });
    // }

    // 🔐 Password validation
    // const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    // if (!passwordRegex.test(password)) {
    //   return res.status(400).json({
    //     status: 'error',
    //     message:
    //       'Password must be at least 8 characters long and contain at least one uppercase letter and one digit',
    //   });
    // }

    // 🔒 Hash the password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 👤 Create new user object
    const newUser = new Auth({
      name,
      username,
      email,
      mobile,
      password: hashedPassword,
      imgURL,
      status,
      role,
      OTP,
    });

    console.log(newUser);
    // 💾 Save the user to the database
    // newUser.save();
    return res.status(201).json({
      status: 'success',
      message: 'User created successfully',
    });
  } catch (error) {
    console.error('🚨 Signup error:', error);
    return res
      .status(500)
      .json({ status: 'error', message: 'Internal Server Error' });
  }
};

module.exports = { SignUP };
