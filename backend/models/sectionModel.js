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
    nameLabel: {
      type: String,
      trim: true,
      required: true,
    },
    label: {
      type: String,
      trim: true,
      defautl: "Active",
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
const Section = mongoose.model("Section", sectionSchema);

// exports
module.exports = Section;
