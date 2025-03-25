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
    label: {
      type: String,
      trim: true,
      default: "Active",
    },

    status: {
      type: String,
      enum: ["active", "pending", "inactive"],
      default: "active",
    },
  },
  { timestamps: true },
);

// create model from the schema
const ClassModel = mongoose.model("Class", classSchema);

// exports
module.exports = ClassModel;
