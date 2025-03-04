// 🔗 External imports
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// 📦 Internal imports (if any)
const Auth = require('../models/authModel');

// 📝 Signup function
const SignUp = async (req, res) => {
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

    // 👤 Create new user object
    const newUser = new Auth({
      name,
      username,
      email,
      mobile,
      password,
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
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error: Something went wrong !',
    });
  }
};

const Login = async (req, res) => {
  try {
    const { username } = req.body;

    const token = await jwt.sign(
      {
        username,
        userId: 4578445,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
    );

    return res.status(200).json({
      access_token: token,
      message: 'Login successful!',
    });

    // 🔍 find user by email

    /*
    const user = await Auth.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email',
      });
    }

    if (user) {
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (isValidPassword) {
        // jwt token generate

        const token = await jwt.sign(
          {
            username,
            userId: user._id,
          },
          process.env.JWT_SECRET,
          { expiresIn: '1h' },
        );

        return res.status(200).json({
          access_token: token,
          message: 'Login successful!',
        });
      }
      res.status(401).json({
        status: false,
        error: 'Authentication failed!',
      });
    }


    return res.status(200).json({
      success: true,
      message: 'Login successful',
    });

    */
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      error: 'Authentication failed !',
    });
  }
};

module.exports = { SignUp, Login };
