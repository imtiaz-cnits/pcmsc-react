// external imports
const mongoose = require("mongoose");

// define the schema
const sessionSchema = new mongoose.Schema(
  {
    year: {
      type: Number,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true },
);

// create a model for the schema
const Session = mongoose.model("Session", sessionSchema);

// exports the module
module.exports = Session;
