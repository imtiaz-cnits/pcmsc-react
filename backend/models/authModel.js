// external imports

const mongoose = require('mongoose');

// internal imports

const authSchema = mongoose.Schema(
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
    img_url: {
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

const AuthModel = mongoose.model('Auth', authSchema);

// internal exports
module.exports = AuthModel;
