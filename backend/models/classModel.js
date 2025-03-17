// external imports

const mongoose = require("mongoose");

// define class schema

const classSchema = new mongoose.Schema(
  {
    name: {
      type: String,
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

// create model from the schema
const ClassModel = mongoose.model("Class", classSchema);

// exports
module.exports = ClassModel;
