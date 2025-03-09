// 📦 External Imports
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const createError = require('http-errors');

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
    avatar: {
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

// ✅ Edge Case: Prevent Race Conditions on Email Check
authSchema.pre('save', async function validateUniqueEmail(next) {
  if (this.isNew) {
    try {
      const existingUser = await mongoose
        .model('Auth')
        .findOne({ $or: [{ email: this.email }, { mobile: this.mobile }] });

      if (existingUser) {
        const field = existingUser.email === this.email ? 'email' : 'mobile';
        return next(createError(409, `${field} already exists`));
      }
    } catch (error) {
      return next(error);
    }
  }
  return next();
});

// 🔑 Edge Case: Hash Password if Not Already Hashed
authSchema.pre('save', async function hashPassword(next) {
  // ⚠️ prevent re-hashing
  if (!this.isModified('password')) return next();

  try {
    // Hash the password
    const saltRounds = 12;
    this.password = await bcrypt.hash(this.password, saltRounds);
    return next();
  } catch (error) {
    return next(error);
  }
});

const AuthModel = mongoose.model('Auth', authSchema);

// 🚀 Export Model for External Usage
module.exports = AuthModel;
