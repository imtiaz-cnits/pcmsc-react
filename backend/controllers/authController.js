// 🔗 External imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

// 📦 Internal imports (if any)
const Auth = require("../models/authModel");

// 📝 do Signup
const SignUp = async (req, res, next) => {
  try {
    const {
      name,
      username,
      email,
      mobile,
      password,
      avatar,
      status,
      role,
      OTP,
    } = req.body;

    console.log("signup form data : ", req.body);
    // 📧 Check if email/mobile already exists
    const existingUser = await Auth.findOne({ $or: [{ email }, { mobile }] });

    if (existingUser && existingUser._id) {
      const field = existingUser.email === email ? "email" : "mobile";
      return next(createError(409, `${field} already exists`));
    }

    // 🔑 hash password

    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    console.log("hashedpassword inside controller : ", hashedPassword);

    // 👤 Create new user object
    const newUser = new Auth({
      name,
      username,
      email,
      mobile,
      password: hashedPassword,
      avatar,
      status,
      role,
      OTP,
    });

    console.log(newUser);

    // 💾 Save the user to the database
    await newUser.save();
    return res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    console.error("🚨 Signup error:", error);
    return next(error);
  }
};

// 📝 do login
async function Login(req, res, next) {
  try {
    console.log("frontend value ", req.body);
    const { userIdentifier, password } = req.body;

    // 🔍 Check if email/mobile is exists
    const user = await Auth.findOne({
      $or: [
        { email: userIdentifier },
        { mobile: userIdentifier },
        { username: userIdentifier },
      ],
    });

    if (!user) {
      return next(createError(404, "User not found"));
    }

    if (user && user._id) {
      // decrypt password
      const isValidPassword = await bcrypt.compare(password, user.password);
      console.log("is valid password : ", isValidPassword);

      if (!isValidPassword) {
        return next(createError(401, "Invalid Credentials!"));
      }
      if (isValidPassword) {
        // ✅  prepare the user object to generate token
        const userObject = {
          userid: user._id,
          name: user.name,
          username: user.username,
          email: user.email,
          mobile: user.mobile,
          avatar: user.avatar || "default_image_url",
        };

        // ✅ generate token
        const token = await jwt.sign(userObject, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRY,
        });

        // ✅ Send the response with the token
        return res.status(200).json({
          success: true,
          access_token: token,
          message: "Login successful!",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return next(error);
  }
}

module.exports = { SignUp, Login };
