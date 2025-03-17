// external imports

const mongoose = require("mongoose");
// define the schema
const sectionSchema = new mongoose.Schema(
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

// create a model for the schema
const Section = mongoose.model("Section", sectionSchema);

// exports
module.exports = Section;
