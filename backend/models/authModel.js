// 📦 External Imports
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

// 🏷️ define schema for authentication
const authSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    imgURL: {
      type: String,
      default: 'default_image_url',
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    OTP: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

// ⚡ Middleware: Check for Existing Email Before Saving
authSchema.pre('save', async function validateUniqueEmail(next) {
  try {
    const existingUser = await mongoose
      .model('Auth')
      .findOne({ email: this.email });

    if (existingUser) {
      const error = new Error('Email already exists');
      error.status = 409;
      return next(error);
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

// 🔑 Middleware: Hash Password Before Saving

authSchema.pre('save', async function hashPassword(next) {
  try {
    // Check if the password is already hashed (to prevent re-hashing)
    if (!this.isModified('password')) {
      return next();
    }

    // Hash the password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(this.password, saltRounds);
    this.password = hashedPassword;
    return next();
  } catch (error) {
    return next(error);
  }
});

const AuthModel = mongoose.model('Auth', authSchema);

// 🚀 Export Model for External Usage
module.exports = AuthModel;
