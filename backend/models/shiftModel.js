// external imports
const mongoose = require("mongoose");

// define the schema
const shiftSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },

    nameLabel: {
      type: String,
      trim: true,
      required: true,
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

// create a model for the schema
const Shift = mongoose.model("Shift", shiftSchema);

// exports
module.exports = Shift;
